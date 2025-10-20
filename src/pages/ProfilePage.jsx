// src/pages/ProfilePage.jsx
export default function ProfilePage() {
  const members = [
    {
      name: "DAMAI RAYA FAKHRUDDIN",
      nim: "21120123130096",
      img: "src/assets/Raya.png",
    },
    {
      name: "FALAHAFIZH RAZZAQI VIO ALDIRA",
      nim: "21120123130099",
      img: "src/assets/Vio.png",
    },
    {
      name: "ZAKI WIRA WIDIANTORO",
      nim: "21120123140185",
      img: "src/assets/Zaki.png",
    },
    {
      name: "ROBBY FERLIANSYAH BAHAR",
      nim: "21120123140119",
      img: "src/assets/Robby.png",
    },
  ];

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8 max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        Profile Anggota Kelompok 37
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col items-center"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-4 shadow-md object-cover"
            />
            <h2 className="text-2xl font-bold text-slate-800 text-center">
              {member.name}
            </h2>
            <p className="text-slate-500">{member.nim}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
