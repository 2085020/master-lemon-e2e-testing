import Axios from 'axios';
import { HotelEntityApi } from './hotel-collection.api-model';

const url = '/api/hotels';

export const getHotelCollection = async (): Promise<HotelEntityApi[]> => {
  const { data } = await Axios.get<HotelEntityApi[]>(url);

  return data;
};



/*
import Axios from 'axios';
import { HotelEntityApi } from './hotel-collection.api-model';

const url = '/api/hotels';

export const getHotelCollection = async (): Promise<HotelEntityApi[]> => {
  const promise = new Promise<HotelEntityApi[]>((resolve) => {
    Axios.get(url).then(({ data }) => setTimeout(() => resolve(data), 4000));
  });

  return promise;
};
*/
