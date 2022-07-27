const { Worker } = require('worker_threads');
const { fork } = require('child_process');
const { PerformanceObserver } = require('perf_hooks');

const perfomanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  })
});
perfomanceObserver.observe({ entryTypes: ['measure'] });

const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark('worker start');

    const worker = new Worker('./worker.js', {
     workerData: {
       array
     }
    })
    worker.on('message', (msg) => {
      performance.mark('worker end');
      performance.measure('worker','worker start', 'worker end');

      resolve(msg);
    });

    worker.on('error', (err) => {
      reject(new Error('worker error: ' + err.message));
    })
  })
}

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark('fork start');

    const forkProcess = fork('./fork.js');
    forkProcess.send(array);
    forkProcess.on('message', (msg) => {
      performance.mark('fork end');
      performance.measure('fork','fork start', 'fork end');

      resolve(msg);
    });
    forkProcess.on('error', (err) => {
      reject(new Error('fork error: ' + err.message));
    })
  })
}

const main = async () => {
  const dataArray = [25, 19, 48, 30];
  try {
    const workerData = await workerFunction(dataArray);
    const forkData = await forkFunction(dataArray);
  } catch(err) {
    console.error(err.message);
  }

}

main();