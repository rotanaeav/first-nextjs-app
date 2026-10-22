export default function UserProfile() {
  const profile = "https://cdn-icons-png.flaticon.com/512/10337/10337609.png";
  const name = "KoKo";
  const position = "Manager";
  const age = 0;
  return (
    <div className="w-50 flex flex-col gap-4">
      <img src={profile} width={200} alt="" />
      <div className="text-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-lg">Position: {position}</p>
        <p>Age: {age}</p>
      </div>
    </div>
  );
}
