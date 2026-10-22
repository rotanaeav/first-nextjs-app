import { User } from "@/lib/user";
export default function PropsComponent(props: User) {
  return (
    <div className="w-50 flex flex-col gap-4">
      <img src={props.profile} width={200} alt="" />
      <div className="text-center">
        <h2 className="text-2xl font-bold">{props.name}</h2>
        <p className="text-lg">Position: {props.position}</p>
        <p>Age: {props.age}</p>
      </div>
    </div>
  );
}
