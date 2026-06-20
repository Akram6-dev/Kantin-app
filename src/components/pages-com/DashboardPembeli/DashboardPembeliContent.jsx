import { useEffect, useMemo, useState } from 'react'
import NavbarPembeli from './NavbarPembeli'
import KantinSection from './KantinSection'
import MakananSection from './MakananSection'
import FloatingCartButton from './FloatingCartButton'
import ProductDetailModal from './ProductDetailModal'
import CartModal from './CartModal'
import Footer from '../../common/Footer'
import { getMe } from '../../../services/AuthService'
import {
  addToCart,
  clearCart,
  getCart,
  getProducts,
  getStands,
  removeCartItem,
  updateCartItem,
} from '../../../services/PembeliService'
import '../../../styles/dashboardpembeli/dashboard.css'
import '../../../styles/dashboardpembeli/navbar.css'
import '../../../styles/dashboardpembeli/searchbar.css'
import '../../../styles/dashboardpembeli/kantin.css'
import '../../../styles/dashboardpembeli/makanan.css'
import '../../../styles/dashboardpembeli/cart.css'
import '../../../styles/dashboardpembeli/modal.css'

const ITEMS_PER_PAGE = 10

function DashboardPembeliContent() {
  const [user, setUser] = useState(null)
  const [kantins, setKantins] = useState([])
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [page, setPage] = useState(1)
  const [productTotalPages, setProductTotalPages] = useState(1)
  const [usesApiPagination, setUsesApiPagination] = useState(false)
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingKantins, setLoadingKantins] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingCart, setLoadingCart] = useState(false)
  const [kantinError, setKantinError] = useState('')
  const [productError, setProductError] = useState('')
  const [addingProductId, setAddingProductId] = useState(null)
  const [cartMessage, setCartMessage] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [modalProductOpen, setModalProductOpen] = useState(false)
  const [cartModalOpen, setCartModalOpen] = useState(false)

  const getErrorMessage = (error, fallback) => {
    return error?.response?.data?.message || error?.message || fallback
  }

  const normalizeItems = (response) => {
    const data = response?.data
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.items)) return data.items
    if (Array.isArray(response?.items)) return response.items
    return []
  }

  const normalizeCartItems = (response) => {
    const data = response?.data
    if (Array.isArray(data)) return data
    if (Array.isArray(data?.items)) return data.items
    if (Array.isArray(response?.items)) return response.items
    return []
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
      setPage(1)
    }, 350)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    let active = true

    const fetchUser = async () => {
      try {
        const response = await getMe()
        if (active) setUser(response?.data || null)
      } catch {
        if (active) setUser(null)
      } finally {
        if (active) setLoadingUser(false)
      }
    }

    fetchUser()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    const fetchKantins = async () => {
      setLoadingKantins(true)
      setKantinError('')
      try {
        const response = await getStands()
        if (active) setKantins(normalizeItems(response))
      } catch (error) {
        if (active) setKantinError(getErrorMessage(error, 'Gagal memuat daftar kantin.'))
      } finally {
        if (active) setLoadingKantins(false)
      }
    }

    fetchKantins()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    const fetchProducts = async () => {
      setLoadingProducts(true)
      setProductError('')
      try {
        const response = await getProducts({
          search: debouncedSearch || undefined,
          page,
          per_page: ITEMS_PER_PAGE,
        })
        if (active) {
          const pagination = response?.data?.pagination
          setProducts(normalizeItems(response))
          setUsesApiPagination(Boolean(pagination?.total_page))
          setProductTotalPages(Number(pagination?.total_page || 1))
        }
      } catch (error) {
        if (active) setProductError(getErrorMessage(error, 'Gagal memuat makanan kantin.'))
      } finally {
        if (active) setLoadingProducts(false)
      }
    }

    fetchProducts()

    return () => {
      active = false
    }
  }, [debouncedSearch, page])

  const refreshCart = async () => {
    setLoadingCart(true)
    try {
      const response = await getCart()
      setCartItems(normalizeCartItems(response))
    } catch (error) {
      setCartMessage(getErrorMessage(error, 'Gagal memuat keranjang.'))
    } finally {
      setLoadingCart(false)
    }
  }

  const totalPages = usesApiPagination
    ? Math.max(1, productTotalPages)
    : Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE))
  const paginatedProducts = useMemo(() => {
    if (usesApiPagination) return products
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [products, page, usesApiPagination])

  const handleNextPage = () => {
    setPage((currentPage) => (currentPage < totalPages ? currentPage + 1 : currentPage))
  }

  const handleAddToCart = async (product, itemQuantity = 1) => {
    setAddingProductId(product.id)
    setCartMessage('')
    try {
      const response = await addToCart(product.id, itemQuantity)
      setCartMessage(response?.message || `${product.nama} ditambahkan ke keranjang.`)
      await refreshCart()
      setModalProductOpen(false)
    } catch (error) {
      setCartMessage(getErrorMessage(error, 'Gagal menambahkan makanan ke keranjang.'))
    } finally {
      setAddingProductId(null)
    }
  }

  const handleOpenProduct = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setModalProductOpen(true)
  }

  const handleOpenCart = async () => {
    setCartModalOpen(true)
    await refreshCart()
  }

  const handleUpdateCartQuantity = async (item, nextQuantity) => {
    setLoadingCart(true)
    try {
      if (nextQuantity <= 0) {
        await removeCartItem(item.cart_item_id)
      } else {
        await updateCartItem(item.cart_item_id, nextQuantity)
      }
      await refreshCart()
    } catch (error) {
      setCartMessage(getErrorMessage(error, 'Gagal memperbarui keranjang.'))
    } finally {
      setLoadingCart(false)
    }
  }

  const handleClearCart = async () => {
    setLoadingCart(true)
    try {
      await clearCart()
      await refreshCart()
    } catch (error) {
      setCartMessage(getErrorMessage(error, 'Gagal mengosongkan keranjang.'))
    } finally {
      setLoadingCart(false)
    }
  }

  return (
    <div className="dashboard-pembeli-page">
      <NavbarPembeli
        user={user}
        loading={loadingUser}
        searchValue={search}
        onSearchChange={setSearch}
      />

      <main className="dashboard-main">
        <section className="dashboard-hero">
          <p className="dashboard-kicker">Pre-order cepat untuk jam istirahat</p>
          <h1>Kantin Sekolah</h1>
        </section>

        <KantinSection kantins={kantins} loading={loadingKantins} error={kantinError} />

        <MakananSection
          makanan={paginatedProducts}
          loading={loadingProducts}
          error={productError}
          page={page}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onAddToCart={handleAddToCart}
          onOpenProduct={handleOpenProduct}
          addingProductId={addingProductId}
          cartMessage={cartMessage}
        />
      </main>

      <FloatingCartButton onClick={handleOpenCart} />
      {modalProductOpen && (
        <ProductDetailModal
          product={selectedProduct}
          kantins={kantins}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onClose={() => setModalProductOpen(false)}
          onAddToCart={handleAddToCart}
          adding={addingProductId === selectedProduct?.id}
        />
      )}
      {cartModalOpen && (
        <CartModal
          items={cartItems}
          products={products}
          loading={loadingCart}
          onClose={() => setCartModalOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onClearCart={handleClearCart}
        />
      )}
      <Footer />
    </div>
  )
}

export default DashboardPembeliContent
