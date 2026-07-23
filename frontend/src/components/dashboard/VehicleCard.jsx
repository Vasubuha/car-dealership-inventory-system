import { Edit3, Eye, PackagePlus, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/formatCurrency';
export default function VehicleCard({ vehicle, onPurchase, onDelete, onRestock }) {
  const { user } = useAuth();
  const admin = user?.role === 'admin';
  const inStock = vehicle.quantity > 0;
  return (
    <Card className="group overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-slate-800 p-5">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-400/20" />
        <div className="absolute -bottom-16 left-8 h-36 w-64 rotate-[-12deg] rounded-[45%] border-8 border-white/10" />
        <p className="relative text-xs font-semibold uppercase tracking-[.18em] text-blue-200">
          {vehicle.category}
        </p>
        <div className="relative mt-12 text-3xl font-black italic tracking-tight text-white">
          {vehicle.make}
        </div>
        <div className="relative text-sm font-medium text-blue-100">{vehicle.model}</div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="mt-1 text-xl font-bold text-slate-900">{formatCurrency(vehicle.price)}</p>
          </div>
          <Badge tone={inStock ? 'green' : 'slate'}>
            {inStock ? `${vehicle.quantity} in stock` : 'Sold out'}
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to={`/vehicles/${vehicle.id}`}>
            <Button variant="secondary" className="w-full">
              <Eye size={16} />
              Details
            </Button>
          </Link>
          {admin ? (
            <>
              <Link to={`/vehicles/${vehicle.id}/edit`}>
                <Button variant="secondary" className="w-full">
                  <Edit3 size={16} />
                  Edit
                </Button>
              </Link>
              <Button variant="secondary" onClick={() => onRestock(vehicle)}>
                <PackagePlus size={16} />
                Restock
              </Button>
              <Button variant="danger" onClick={() => onDelete(vehicle)}>
                <Trash2 size={16} />
                Delete
              </Button>
            </>
          ) : (
            <Button disabled={!inStock} onClick={() => onPurchase(vehicle)} className="w-full">
              <ShoppingCart size={16} />
              Purchase
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
