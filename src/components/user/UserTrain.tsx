interface UserTrainInterface {
  train: number | null | undefined;
}
const UserTrain = ({ train }: UserTrainInterface) => {
  return <>{train && <span className="pl-2">{train}</span>}</>;
};

export default UserTrain;
