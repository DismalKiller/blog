import "./HomeCard.css";

export default function HomeCard(props: any) {
  const { children } = props;
  return (
    <div className="card">
      <div className="card2 flex justify-center items-center">{children}</div>
    </div>
  );
}
