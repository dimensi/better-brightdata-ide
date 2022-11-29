const waitTime = (time = 1e3) => new Promise(res => setTimeout(res, time));
export async function wait(selector: string, timeout = 30) {
  let counter = 0;
  while (counter < timeout) {
    if (document.querySelector(selector)) {
      return;
    } else {
      counter++;
      await waitTime();
    }
  }

  throw new Error('not exists');
}
