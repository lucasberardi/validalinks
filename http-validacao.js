import fetch from "node-fetch";

function handleErrors(err) {
  throw new Error(err.message);
}

async function checaStatus(arrayURLs) {
  try {
    const arrayStatus = await Promise
      .all(arrayURLs
        .map(async url => {
          const res = await fetch(url);
          return `${res.status} - ${res.statusText}`;
        }))
    return arrayStatus;
  } catch (err) {
    handleErrors(err);
  }
}

function geraArrayDeURLs(arrayLinks) {
  return arrayLinks
    .map(objetoLink => Object
      .values(objetoLink).join());
}

async function validaURLs(arrayLinks) {
  const links = geraArrayDeURLs(arrayLinks);
  const statusLinks = await checaStatus(links);

  const resultados = arrayLinks
    .map((obj, i) => ({
      ...obj, status: statusLinks[i]
    }));

  return resultados;
}

export default validaURLs;