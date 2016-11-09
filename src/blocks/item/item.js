import config from '../../../server/data/config.json';

export const createSrc = (fileName) => {
    return `http://${config.host}/images/${fileName}`;
};