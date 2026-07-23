import VehicleCard from './VehicleCard';
export default function VehicleGrid({ vehicles, ...actions }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} {...actions} />
      ))}
    </div>
  );
}
