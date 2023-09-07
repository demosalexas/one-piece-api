import { Box, useColorModeValue } from '@chakra-ui/react'

export default function Navlink ({ link }: any) {
  const { label, url } = link
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={url}
    >
      {label}
    </Box>
  )
}
