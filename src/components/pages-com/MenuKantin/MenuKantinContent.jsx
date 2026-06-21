import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NavbarPembeli from '../../common/NavbarPembeli'
import Footer from '../../common/Footer'
import ProductCard from '../../common/ProductCard'
import ProductModal from '../../common/ProductModal'
import CartFloatingButton from '../../common/CartFloatingButton'
import CartModal from '../../common/CartModal'
import LoadingSkeleton from '../../common/LoadingSkeleton'
import HeaderKantin from './HeaderKantin'
import { getMe } from '../../../services/AuthService'
import {
  addToCart,
  clearCart,
  getCart,
  getProducts,
  getStandById,
  getStands,
  removeCartItem,
  updateCartItem,
} from '../../../services/PembeliService'
import '../../../styles/menuKantin.css'

function MenuKantinContent() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [user, setUser] = useState(null)
  const [kantin, setKantin] = useState(null)
  const [kantins, setKantins] = useState([])
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [loadingKantin, setLoadingKantin] = useState(true)
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

  const kantinIndex = kantins.findIndex((entry) => String(entry.id) === String(id))
  const kantinLabel = kantinIndex >= 0 ? `Kantin ${kantinIndex + 1}` : kantin?.nama_stand || 'Kantin'
  const menuTitle = kantinIndex >= 0 ? `Menu Kantin ${kantinIndex + 1}` : `Menu ${kantinLabel}`

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

  const normalizeSingle = (response) => {
    return response?.data || response || null
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim())
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
      try {
        const response = await getStands()
        if (active) setKantins(normalizeItems(response))
      } catch {
        if (active) setKantins([])
      }
    }

    fetchKantins()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    let active = true

    const fetchKantin = async () => {
      setLoadingKantin(true)
      setKantinError('')
      try {
        const response = await getStandById(id)
        if (active) setKantin(normalizeSingle(response))
      } catch (error) {
        if (active) setKantinError(getErrorMessage(error, 'Gagal memuat informasi kantin.'))
      } finally {
        if (active) setLoadingKantin(false)
      }
    }

    if (id) fetchKantin()

    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    let active = true

    const fetchProducts = async () => {
      setLoadingProducts(true)
      setProductError('')
      try {
        const response = await getProducts({
          stand_id: id,
          search: debouncedSearch || undefined,
        })
        if (active) setProducts(normalizeItems(response))
      } catch (error) {
        if (active) setProductError(getErrorMessage(error, 'Gagal memuat menu kantin.'))
      } finally {
        if (active) setLoadingProducts(false)
      }
    }

    if (id) fetchProducts()

    return () => {
      active = false
    }
  }, [id, debouncedSearch])

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
    <div className="menu-kantin-page">
      <NavbarPembeli user={user} searchValue={search} onSearchChange={setSearch} />

      <main className="menu-kantin-main">
        <button className="menu-kantin-back" type="button" onClick={() => navigate('/Pembeli')}>
          ← Kembali
        </button>

        {loadingKantin && <LoadingSkeleton variant="header" />}
        {!loadingKantin && !kantinError && (
          <HeaderKantin kantin={kantin} kantinIndex={kantinIndex} loading={loadingKantin} />
        )}
        {!loadingKantin && kantinError && (
          <p className="menu-kantin-state menu-kantin-state-error">{kantinError}</p>
        )}

        <h2 className="menu-kantin-title">{menuTitle}</h2>

        {cartMessage && <p className="menu-kantin-message">{cartMessage}</p>}

        <div className="menu-kantin-content" aria-busy={loadingProducts}>
          {loadingProducts && <LoadingSkeleton count={8} />}
          {!loadingProducts && productError && (
            <p className="menu-kantin-state menu-kantin-state-error">{productError}</p>
          )}
          {!loadingProducts && !productError && products.length === 0 && (
            <p className="menu-kantin-state">Menu belum tersedia untuk kantin ini.</p>
          )}
          {!loadingProducts && !productError && products.length > 0 && (
            <div className="makanan-grid">
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  makanan={item}
                  onAddToCart={handleAddToCart}
                  onOpenDetail={handleOpenProduct}
                  adding={addingProductId === item.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <CartFloatingButton onClick={handleOpenCart} />
      {modalProductOpen && (
        <ProductModal
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

export default MenuKantinContent
