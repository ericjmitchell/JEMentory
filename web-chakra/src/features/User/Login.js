import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, userSelector, clearState, setShowPassword } from './UserSlice'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa"

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { register, handleSubmit } = useForm()
  const { isFetching, isSuccess, isError, errorMessage, showPassword } = useSelector(
    userSelector
  )
  const onSubmit = (data) => {
    dispatch(loginUser(data))
  }

  const handleShowClick = () => {
    dispatch(setShowPassword(!showPassword))
  }

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }

    if (isSuccess) {
      dispatch(clearState())
      history.push('/')
    }
  }, [isError, isSuccess, dispatch, history, errorMessage])

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    placeholder="email address"
                    {...register('email', {
                      pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                      required: true
                    })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                isLoading={isFetching ? true : undefined}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
