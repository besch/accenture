import { of, merge } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';

function getProcessingPage(inputStates) {
    const result = of(null);
    let timer = 0;
    const obs = []
    const setupObservable = value => obs.push(result.pipe(mapTo(value), delay(timer)))

    inputStates.map(s => {
        const state = s.state
        if (state == 'processing') {
            timer += 1000
            setupObservable('')
        }
        if (state == 'success') {
            setupObservable({ title: 'Order complete', message: null })
            // obs.push(result.pipe(mapTo({ title: 'Order complete', message: null }), delay(timer)))
        }
        if (state == 'error') {
            const error = s.error
            switch (error) {
                case 'NO_STOCK':
                    return setupObservable({ title: 'Error page', message: 'No stock has been found' })
                case 'INCORRECT_DETAILS':
                    return setupObservable({ title: 'Error page', message: 'Incorrect details have been entered' })
                case null:
                    return setupObservable({ title: 'Error page', message: null })
                case undefined:
                    return setupObservable({ title: 'Error page', message: null })
            }
        }
    })

    const message = merge(...obs);
    message.subscribe(val => console.log(val));
}

getProcessingPage([
    { state: 'processing' }, 
    { state: 'success' }, 
    { state: 'processing' }, 
    { state: 'error', error: null }
])