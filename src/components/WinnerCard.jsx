export default function WinnerCard({

  winner,

  prize,

  image,

  date

}) {

  return (

    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

      <img

        src={image}

        alt={winner}

        className="h-56 w-full object-cover"

      />

      <div className="p-6">

        <h2 className="text-2xl font-bold">

          {winner}

        </h2>

        <p className="mt-3 text-gray-600">

          Won

          <span className="font-bold">

            {" "} {prize}

          </span>

        </p>

        <p className="mt-3 text-gray-500">

          {date}

        </p>

        <div className="mt-5">

          <span className="bg-green-600 text-white px-4 py-2 rounded-full">

            Verified Winner

          </span>

        </div>

      </div>

    </div>

  );

}