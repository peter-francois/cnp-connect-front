import PrimaryTitle from "../../components/ui/PrimaryTitle";


const ConversationsListPage = () => {

  // if (!data) return <p>Aucune conversation trouvé.</p>;



  // if (isPending) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }



  return (
    <>
      <PrimaryTitle customClass="text-center my-5">Toutes les conversations</PrimaryTitle>

      <section className="border border-indigo-600 rounded-2xl py-5 relative">
        <div className="flex items-center justify-between border-b-1 border-indigo-600 pb-2 font-bold w-full ">
          <span className="pl-14">Conversation</span>
          <span className="pr-10">Participant</span>
        </div>

        <ul>
            {/* {conversations.map<ConversationInfos/>} */}
        </ul>
      </section>
    </>
  );
};

export default ConversationsListPage;
