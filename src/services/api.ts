import axios from 'axios';

export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Tambahkan ini juga untuk FakeStoreAPI (Add/Edit)
export const fakeStoreApi = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  timeout: 10000,
});