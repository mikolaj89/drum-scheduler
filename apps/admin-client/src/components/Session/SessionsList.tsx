"use client";
import { fetchSessions } from "@/utils/sessions-api";
import { useQuery } from "@tanstack/react-query";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import {
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { TableLink } from "../Common/Link";
import { Session } from "../../../../api/db/types";

export const SessionsList = ({ sessionsData }: { sessionsData: Session[] }) => {
  const { data } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
    initialData: { data: sessionsData },
    refetchOnMount: false,
  }).data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Notes</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <TableLink href={`/sessions/${row.id}`}> {row.name} </TableLink>
              </TableCell>
              <TableCell align="right">{row.notes}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
