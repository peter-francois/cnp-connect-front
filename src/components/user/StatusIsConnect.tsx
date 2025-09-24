interface StatusIsConnectInterface {
  status: boolean;
}
const StatusIsConnect = ({ status }: StatusIsConnectInterface) => {
  return <div className={`rounded-full mt-1 ml-2 w-3 h-3 p-2 ${status ? "bg-green-600" : "bg-red-600"}`}></div>;
};

export default StatusIsConnect;
