import Config from 'react-native-config';

export const loadDailyChartList = async (date: string) => {
  const url = `${Config.API_URL}/dailychart?listDate=${date}`;
  try {
    const res = await fetch(url, { method: 'GET' }); // android는 localhost 사용을 위한 설정 필요
    const list = await res.json();

    return list;
  } catch (e) {
    console.error('An error occured in loadDailyChartList', e);
    throw e;
  }
};
