import { Transaction } from "../../utils/models";
import { Container, Typography, Button } from "@material-ui/core";
import {
  Column,
  IntegratedFiltering,
  IntegratedPaging,
  PagingState,
  SearchState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Toolbar,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { SortingState } from "@devexpress/dx-react-grid";
import { GetServerSideProps, NextPage } from "next";
import { Token, validateAuth } from "../../utils/auth";
import makeHttp from "../../utils/http";
import { parseISO, format } from "date-fns";
import { useRouter } from "next/router";

interface TransactionsPageProps {
  transactions: Transaction[];
}

const columns: Column[] = [
  {
    name: "payment_date",
    title: "Data Pag.",
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
    },
  },
  {
    name: "name",
    title: "nome",
  },
  {
    name: "category",
    title: "categoria",
  },
  {
    name: "type",
    title: "operação",
  },
  {
    name: "created_at",
    title: "Criado em",
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), "dd/MM/yyyy");
    },
  },
];

const TransactionsPage: NextPage<TransactionsPageProps> = (props: any) => {
  const router = useRouter();
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas Transações
      </Typography>
      <Button
        variant={"contained"}
        color="primary"
        onClick={() => router.push("/transactions/new")}
      >
        Criar
      </Button>
      <Grid rows={props.transactions} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[{ columnName: "created_at", direction: "desc" }]}
        />
        <SearchState defaultValue="Conta de Luz" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Container>
  );
};

export default TransactionsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const auth = validateAuth(ctx.req);
  if (!auth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const token = (auth as Token).token;

  const { data: transactions } = await makeHttp(token).get("transactions");

  return {
    props: { transactions },
  };
};
