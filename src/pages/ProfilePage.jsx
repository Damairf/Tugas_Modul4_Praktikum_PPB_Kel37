import Raya from "../assets/Raya.png";
import Vio from "../assets/Vio.png";
import Zaki from "../assets/Zaki.png";
import Robby from "../assets/Robby.png";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {[ 
        { img: Raya, name: "DAMAI RAYA FAKHRUDDIN", nim: "21120123130096" },
        { img: Vio, name: "FALAHAFIZH RAZZAQI VIO ALDIRA", nim: "21120123130099" },
        { img: Zaki, name: "ZAKI WIRA WIDIANTORO", nim: "21120123140185" },
        { img: Robby, name: "ROBBY FERLIANSYAH BAHAR", nim: "21120123140119" }
      ].map((member) => (
        <div key={member.nim} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mb-4 shadow-md object-cover" />
          <h2 className="text-2xl font-bold text-slate-800">{member.name}</h2>
          <p className="text-slate-500">{member.nim}</p>
        </div>
      ))}
    </div>
  );
}
