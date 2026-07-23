import { useEffect, useState } from 'react';
import { Edit3, Eye, PackagePlus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';

export const DEFAULT_CAR_IMAGE =
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80';

export default function VehicleCard({
  vehicle,
  onPurchase,
  onDelete,
  onRestock,
  isPreview = false,
}) {
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const [imageError, setImageError] = useState(false);

  const rawImg = vehicle?.imageUrl || vehicle?.image_url;

  useEffect(() => {
    setImageError(false);
  }, [rawImg, vehicle?.id]);

  let displayImage = DEFAULT_CAR_IMAGE;
  if (!imageError && rawImg && typeof rawImg === 'string' && rawImg.trim()) {
    let trimmed = rawImg.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    displayImage = trimmed;
  }

  const quantity = Number(vehicle?.quantity) || 0;
  const inStock = quantity > 0;
  const isLowStock = quantity >= 1 && quantity <= 5;
  const stockBadgeTone = quantity === 0 ? 'slate' : isLowStock ? 'amber' : 'green';
  const stockBadgeText =
    quantity === 0
      ? 'Sold out'
      : isLowStock
        ? `${quantity} left (Low Stock)`
        : `${quantity} in stock`;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 border border-slate-200/80 bg-white">
      <div className="relative h-52 overflow-hidden bg-slate-900">
        <img
          src={displayImage}
          alt={`${vehicle?.make || 'Vehicle'} ${vehicle?.model || ''}`}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
        <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
          <div>
            <span className="inline-block rounded-md bg-blue-600/90 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-xs shadow-xs">
              {vehicle?.category || 'Category'}
            </span>
            <p className="mt-1.5 text-xl font-black tracking-tight text-white drop-shadow-sm truncate">
              {vehicle?.make || 'Make'} {vehicle?.model || 'Model'}
            </p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 truncate max-w-[180px] sm:max-w-[200px] text-base">
              {vehicle?.make || 'Vehicle Make'} {vehicle?.model || 'Model'}
            </h3>
            <p className="mt-1 text-2xl font-black tracking-tight text-slate-900">
              {formatCurrency(Number(vehicle?.price) || 0)}
            </p>
          </div>
          <Badge tone={stockBadgeTone}>{stockBadgeText}</Badge>
        </div>

        {!isPreview ? (
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Link to={`/vehicles/${vehicle.id}`}>
              <Button variant="secondary" className="w-full text-xs">
                <Eye size={15} />
                Details
              </Button>
            </Link>
            {admin ? (
              <>
                <Link to={`/vehicles/${vehicle.id}/edit`}>
                  <Button variant="secondary" className="w-full text-xs">
                    <Edit3 size={15} />
                    Edit
                  </Button>
                </Link>
                <Button variant="secondary" onClick={() => onRestock?.(vehicle)} className="text-xs">
                  <PackagePlus size={15} />
                  Restock
                </Button>
                <Button variant="danger" onClick={() => onDelete?.(vehicle)} className="text-xs">
                  <Trash2 size={15} />
                  Delete
                </Button>
              </>
            ) : (
              <Button disabled={!inStock} onClick={() => onPurchase?.(vehicle)} className="w-full text-xs shadow-md shadow-blue-500/15">
                <ShoppingCart size={15} />
                Purchase
              </Button>
            )}
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-slate-50/80 p-3.5 border border-slate-100 text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span className="font-medium text-slate-500">Category:</span>
              <strong className="text-slate-800 font-bold">{vehicle?.category || 'Not selected'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-500">Stock Quantity:</span>
              <strong className="text-slate-800 font-bold">{quantity} units</strong>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-500">Price per unit:</span>
              <strong className="text-slate-800 font-bold">{formatCurrency(Number(vehicle?.price) || 0)}</strong>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
