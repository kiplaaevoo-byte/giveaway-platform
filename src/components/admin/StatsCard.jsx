export default function StatsCard({
  title,
  value,
  icon: Icon,
  color
}){


  return (

    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">


      <div>

        <p className="text-gray-500">
          {title}
        </p>


        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>


      </div>



      <div
        className={`${color} text-white p-4 rounded-xl`}
      >

        <Icon size={30}/>

      </div>


    </div>

  );

}