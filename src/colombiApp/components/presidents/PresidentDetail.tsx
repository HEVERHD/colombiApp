

const PresidentDetail = ({ president }:any) => {
  return (
    <div>
      <h3>{president.name}</h3>
      <div>
      <p>De la ciudad de <span> {president.city.name} </span></p>
      <p>Presidente de colombia en <span> {president.startPeriodDate} </span></p>
      <img src={president.image} alt={president.name} />
      </div>
      <p>{president.description}</p>
    </div>
  );
};

export default PresidentDetail;
