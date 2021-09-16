import {
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  MenuItem,
} from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/ssr";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Head } from "../../components/Heads";
import { Page } from "../../components/Page";
import makeHttp from "../../utils/http";
import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from "../../utils/models";

const TransactionsNewPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { initialized, keycloak } = useKeycloak();

  async function onSubmit(data: any) {
    try {
      // console.log(data);
      await makeHttp().post("transactions", data);
      router.push("/transactions");
    } catch (e) {
      console.error(e);
    }
  }

  if (
    typeof window !== "undefined" &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace(`/login?from=${window!.location.pathname}`);
    return null;
  }

  return keycloak?.authenticated ? (
    <Page>
      <Head title="Nova transação" />
      <Typography component="h1" variant="h4">
        Nova transação
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("payment_date")}
              type="date"
              required
              label="Data pagamento"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              {...register("name")}
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              {...register("description")}
              label="Descrição"
              required
              fullWidth
            />
            <TextField
              {...register("category")}
              select
              required
              label="Categoria"
              fullWidth
            >
              {TransactionCategoryLabels.map((i: any, key: number) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register("ammount", { valueAsNumber: true })}
              required
              type="number"
              label="Valor"
              fullWidth
            />
            <TextField
              {...register("type")}
              select
              required
              label="Tipo de operação"
              fullWidth
            >
              {TransactionTypeLabels.map((i, key) => (
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>
            <Box marginTop={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Salvar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Page>
  ) : null;
};

export default TransactionsNewPage;
