import { GetServerSideProps, GetServerSidePropsContext } from "next";

const ServerPage = (props: any) => {
  return <div>SERVER - {props.name}</div>;
};

export default ServerPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {
      name: "Gustavo",
    },
  };
};
