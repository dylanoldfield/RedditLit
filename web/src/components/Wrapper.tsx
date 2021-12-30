import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  variant: "small" | "large"
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant}) => {
    return (
      <Box mt={8} mx="auto" maxWidth={variant==="large" ? "800px" : "200px"}>
        {children}
      </Box>
    );
}