import styled from '@emotion/styled';

import { Card as MUICard, CardContent as MUICardContent } from '@mui/material';

export const Card = styled(MUICard)({
    maxWidth: '300px',
    borderRadius: '4px',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
})

export const CardContent = styled(MUICardContent)({
    padding: '20px'
})