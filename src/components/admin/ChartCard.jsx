import Card from "../ui/Card";

export default function ChartCard({
  title,
  children,
}) {
  return (

    <Card>

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold">

          {title}

        </h2>

      </div>

      <div className="h-80 flex items-center justify-center">

        {children}

      </div>

    </Card>

  );
}