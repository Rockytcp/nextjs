import { Container, Typography } from "@material-ui/core";
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

const columns: Column[] = [
  {
    name: "payment_made",
    title: "Data Pag.",
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
  },
];

const TransactionsPage = (props: any) => {
  return (
    <Container>
      <Typography component="h1" variant="h4">
        Minhas Transações
      </Typography>
      <Grid rows={[]} columns={columns}>
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
