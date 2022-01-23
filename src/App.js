import {
    useState,
    useEffect
} from "react";

import {
    documents,
    realtime
} from "./support/firebase";

import QRCode from "qrcode.react";


const presetData = {
    name: ' ---- ',
    current: null
};

const App = () => {

    const [ queues, setQueues ] = useState({});
    const [ cancel, setCancel ] = useState(_=>_=>{});
    const [ data, setData ]     = useState(presetData);

    useEffect(_ => documents('queue').then(q => setQueues(q)), []);

    function select(queue) {

        if(queue) {

            cancel();
            
            const unsubscribe = realtime('queue', queue, (data, id) => {
                console.log(`Informação recebida de ${id}`);
                setData(data);
            });

            setCancel(_ => unsubscribe);

        } else setData(presetData);

    }
  
    return (
        <div className="m-0 p-0">

            <h1 className="p-5 mb-4 bg-secondary text-light">Firebase Tests</h1>

            <div className="container">

                <div className="my-4">

                    <select className="form-select" onChange={ input => select(input.currentTarget.value) }>
                        
                        <option value=''> ==== Selecione a Fila ==== </option>

                        { Object.keys(queues).map((queue, i) => (
                            <option key={ i } value={ queue }>
                                { queues[queue].name }
                            </option>
                        )) }

                    </select>    

                </div>                

                <div className="d-md-flex justify-content-between align-items-center">

                    <div>

                        <div className="m-1">{ data.name }</div>

                        <div className="m-1">
                            <strong>Senha:</strong>
                            <span className="m-1 text-secondary h5">
                                { data.current && data.current.toLocaleString() }
                            </span>
                        </div>

                    </div>

                    <div>
                        <button className="btn btn-primary" disabled={ !data.current }>
                            Avançar
                        </button>
                    </div>

                </div>

                <hr />

                <QRCode
                    className='my-2'
                    renderAs='svg'
                    level='M'
                    size={ 256 }
                    value={ JSON.stringify(data) }
                />

            </div>

        </div>
    );

}

export default App;
