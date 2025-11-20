import { useOpportunities } from "@/api/queries/query";
import {
  CardComponent,
  CardContentComponent,
  CardHeaderComponent,
  CardSkeleton,
} from "@/components/card";
import { useInView } from "@/hooks/useInView";
import { Box, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/opportunities")({
  component: RouteComponent,
});

function RouteComponent() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  const {
    opportunities,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useOpportunities();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ m: 4, display: "flex", flexDirection: "column", gap: 2 }}>
      {opportunities.map((data) => (
        <CardComponent key={data.id}>
          <CardHeaderComponent title={data.company} />
          <CardContentComponent>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
            >
              {data.title}
            </Typography>
            <Typography variant="h5">
              R$ {data.value.toLocaleString()}
            </Typography>
          </CardContentComponent>
        </CardComponent>
      ))}

      {hasNextPage ? <CardSkeleton ref={ref as any} /> : null}
    </Box>
  );
}
