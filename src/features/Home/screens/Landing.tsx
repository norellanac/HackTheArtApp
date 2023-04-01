import { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Button,
  FlatList,
  Heading,
  HStack,
  Stack,
  Text,
} from 'native-base';

import React, { useEffect, useState } from 'react';
import { HomeStackParams } from './HomeStack';
import { Footer } from '../components/templates/Footer';
interface Props extends StackScreenProps<HomeStackParams, 'Home'> {}

export const Landing = ({ route, navigation }: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg" color="primary.500">
          Welcome to NativeBase
        </Heading>
        <Heading color="muted.400" size="xs">
          Learn NativeBase from examples
        </Heading>

        <Stack space={4} mt={5}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <HStack space={2}>
                  <Box
                    size={12}
                    rounded="md"
                    bg={{ uri: 'https://i.pravatar.cc/300' }}
                  />
                  <Stack space={1}>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text color="muted.400" fontSize="xs">
                      {item.email}
                    </Text>
                  </Stack>
                </HStack>
              )}
              keyExtractor={item => item.id}
              ListHeaderComponent={
                <Text bold color="muted.700">
                  List of Users
                </Text>
              }
            />
          )}
        </Stack>
      </Box>
      <Footer navigation={navigation} />
    </>
  );
};
