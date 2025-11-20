import { Avatar, CardHeader, IconButton, Skeleton } from "@mui/material";

import React from "react";
import * as Styled from './style';

type CardSkeletonProps = React.ComponentProps<typeof Skeleton>;

export const CardComponent = ({ children, ...props }: { children: React.ReactNode }) => {
    return <Styled.Card {...props}>
        {children}
    </Styled.Card>
}


export const CardSkeleton = React.forwardRef<HTMLDivElement, CardSkeletonProps>(
  (props, ref) => {
    return (
      <Skeleton
        ref={ref}
        variant="rectangular"
        width={300}
        height={118}
        {...props}
      />
    );
  }
);

export const CardHeaderComponent = ({ avatar, title, subheader, icon }: { avatar?: string, title?: string, subheader?: string, icon?: any }) => {
    return <CardHeader 
        avatar={
            avatar && <Avatar sx={{ bgcolor: 'secondary.main' }}>
                {avatar}
            </Avatar>
        }
        title={title}
        subheader={subheader}
        action={
            icon && 
            <IconButton size="small">
                {icon}
            </IconButton>
        }
    />
}

export const CardContentComponent = ({ children }: { children: React.ReactNode }) => {
    return <Styled.CardContent>
        {children}
    </Styled.CardContent>
}