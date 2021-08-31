import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'
import toast from 'react-hot-toast'
import {
  chakra,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  FormControl,
} from "@chakra-ui/react"
import { FaUserAlt } from "react-icons/fa"

import { itemSelector, fetchItem, saveItem, clearState } from './ItemSlice'
import Header from '../../helpers/Header'

const CFaUserAlt = chakra(FaUserAlt)

const ItemView = () => {
  const { id: itemId } = useParams()
  const { register, handleSubmit, setValue } = useForm()

  const dispatch = useDispatch()
  const { isFetching, isError, isSuccess, errorMessage } = useSelector(itemSelector)
  useEffect(() => {
    if (itemId === 'new') {
      dispatch(clearState())
    } else {
      dispatch(fetchItem({ token: localStorage.getItem('token'), itemId }))
    }
  }, [dispatch])

  const {
    name,
    category,
    amount,
    unit,
    daysPerUnit,
    lastPrice,
    purchaseAmount,
    purchaseDate,
    store,
    tax,
  } = useSelector(itemSelector)

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }

    if (isSuccess) {
      setValue("name", name)
      setValue("category", category)
      setValue("amount", amount)
      setValue("unit", unit)
      setValue("daysPerUnit", daysPerUnit)
      setValue("lastPrice", lastPrice)
      setValue("purchaseAmount", purchaseAmount)
      setValue("purchaseDate", purchaseDate)
      setValue("store", store)
      setValue("tax", tax)
    }
  }, [
    isError,
    isSuccess,
    itemId,
    name,
    category,
    amount,
    unit,
    daysPerUnit,
    lastPrice,
    purchaseAmount,
    purchaseDate,
    store,
    tax,])

  const onSubmit = (data) => {
    data.id = itemId
    dispatch(saveItem({ token: localStorage.getItem('token'), item: data }))
  }

  return (
    <React.Fragment>
      <Header />
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
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
                  type="text"
                  placeholder="item name"
                  {...register('name', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item category"
                  {...register('category', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item amount"
                  {...register('amount', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item unit"
                  {...register('unit', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item daysPerUnit"
                  {...register('daysPerUnit', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item lastPrice"
                  {...register('lastPrice', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item purchaseAmount"
                  {...register('purchaseAmount', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item purchaseDate"
                  {...register('purchaseDate', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item store"
                  {...register('store', {
                    required: true
                  })}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="item tax"
                  {...register('tax', {
                    required: true
                  })}
                />
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
              Save
            </Button>
          </Stack>
        </form>
      )}
    </React.Fragment>
  )
}

export default ItemView
