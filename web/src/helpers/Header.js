import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, fetchUser, clearState } from '../features/User/UserSlice'
import Loader from 'react-loader-spinner'
import { useHistory, Link as ReactRouterLink } from 'react-router-dom'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import {
  chakra,
  HStack,
  Link,
  Flex,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  Spacer,
} from "@chakra-ui/react"

import { AiFillHome } from "react-icons/ai"
import { Logo } from "@choc-ui/logo"

const Header = () => {
  const history = useHistory()

  const dispatch = useDispatch()
  const { isFetching, isError } = useSelector(userSelector)

  useEffect(() => {
    dispatch(fetchUser({ token: localStorage.getItem('token') }))
  }, [dispatch])

  //const { firstName, lastName } = useSelector(userSelector)

  useEffect(() => {
    if (isError) {
      dispatch(clearState())
      history.push('/login')
    }
  }, [isError, dispatch, history])

  const onLogOut = () => {
    localStorage.removeItem('token')

    history.push('/login')
  }

  const mobileNav = useDisclosure()

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}
        onClick={() => { history.push('/items') }}
      >
        Items
      </Button>
    </VStack>
  )

  return (
    <React.Fragment>
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <chakra.header
          transition="box-shadow 0.2s"
          borderTop="6px solid"
          borderTopColor="brand.400"
          w="full"
          overflowY="hidden"
        >
          <chakra.div h="4.5rem" mx="auto" maxW="1200px">
            <Flex
              w="full"
              h="full"
              px="6"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex align="flex-start">
                <Link as={ReactRouterLink} to="/">
                  <HStack>
                    <Logo />
                  </HStack>
                </Link>
              </Flex>
              <Flex>
                <HStack spacing="5" display={{ base: "none", md: "flex" }}>
                  <Button
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    onClick={() => { history.push('/items') }}
                  >
                    Items
                  </Button>
                </HStack>
              </Flex>
              <Spacer />
              <Flex justify="flex-end" align="center">
                <HStack spacing="5" display={{ base: "none", md: "flex" }}>
                  <Button colorScheme="brand" variant="ghost" size="sm"
                    onClick={onLogOut}
                  >
                    Log Out
                  </Button>
                </HStack>
                <ColorModeSwitcher />
              </Flex>
            </Flex>
            {MobileNavContent}
          </chakra.div>
        </chakra.header>
      )}
    </React.Fragment>
  )
}

export default Header
