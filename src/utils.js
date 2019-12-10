const generateNumbers = (quantity) => {
  const randomNumbers = new Set();
  while (randomNumbers.size < quantity) {
    randomNumbers.add(`0${Math.floor(100000000 + Math.random() * 900000000)}`);
  }
  return [...randomNumbers];
};

const paginate = (limit, page, dataArray) => {
  if (!dataArray) {
    return false;
  }

  const totalCount = dataArray.length;
  const pageCount = Math.ceil(totalCount / limit);
  const dataOffset = (parseInt(page, 10) - 1) * limit;
  const dataLimit = parseInt(page, 10) * limit;
  const data = dataArray.slice(dataOffset, dataLimit);

  return {
    data,
    page,
    totalCount,
    pageCount,
  };
};

export {
  generateNumbers,
  paginate,
};
