'use client'

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from '@chakra-ui/react'

export default function Hero () {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          One Piece{' '}
          <Text as={'span'} color={'blue.400'}>
            API
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'5xl'}>
          Coming Soon!
        </Text>
      </Stack>
    </Container>
  )
}
