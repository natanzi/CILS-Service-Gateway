import { useState, useEffect } from 'react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';

const osOptions = ['Ubuntu 18.04', 'Ubuntu 20.04'];
const gpuOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const cpuOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ramOptions = ['8GB', '16GB', '32GB'];

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      onLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="mb-6 text-gray-600">Welcome Back, Please enter your details</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              type="submit"
            >
              Continue
            </button>
          </form>
          <div className="my-6 text-center text-gray-500">Or Continue With</div>
          <div className="flex justify-center space-x-4">
            <button className="p-3 bg-gray-100 rounded-full">
              <FaGoogle className="text-xl text-gray-600" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full">
              <FaApple className="text-xl text-gray-600" />
            </button>
            <button className="p-3 bg-gray-100 rounded-full">
              <FaFacebook className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div className="w-1/2 bg-blue-600 text-white flex items-center justify-center rounded-r-lg">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Vault illustration"
              className="w-48 h-48 mx-auto mb-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CILSServiceGateway = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [requestType, setRequestType] = useState('Virtual Machine (VM)');
  const [operatingSystem, setOperatingSystem] = useState(osOptions[0]);
  const [cpu, setCpu] = useState(cpuOptions[0]);
  const [gpu, setGpu] = useState(gpuOptions[0]);
  const [ram, setRam] = useState(ramOptions[0]);
  const [storage, setStorage] = useState(100);
  const [validityPeriod, setValidityPeriod] = useState(1);
  const [validityUnit, setValidityUnit] = useState('days');
  const [progress, setProgress] = useState(0);
  const [accessDetails, setAccessDetails] = useState({
    osUsername: '',
    password: '',
    sshAccess: '',
  });
  const [requests, setRequests] = useState([]);
  const [requestId, setRequestId] = useState(1);

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [progress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validityPeriod <= 0) {
      alert('Please enter a positive validity period.');
      return;
    }

    const serviceRequest = {
      requestType,
      operatingSystem,
      cpu,
      gpu,
      ram,
      storage,
      validityPeriod,
      validityUnit,
    };
    
    setRequests((prevRequests) => [...prevRequests, serviceRequest]);
    setRequestId((prevRequestId) => prevRequestId + 1);
    setProgress(10);

    setTimeout(() => {
      setAccessDetails({
        osUsername: `user${requestId}`,
        password: `pass${requestId}`,
        sshAccess: `ssh@${requestId}`,
      });
    }, 10000);
  };

  const SelectField = ({ label, id, value, options, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
        {label}
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        id={id}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CILS Service Gateway</h1>
      <form onSubmit={handleSubmit}>
        <SelectField
          label="Request Type"
          id="requestType"
          value={requestType}
          options={['Virtual Machine (VM)', 'Session', 'Container']}
          onChange={(e) => setRequestType(e.target.value)}
        />
        <SelectField
          label="Operating System"
          id="operatingSystem"
          value={operatingSystem}
          options={osOptions}
          onChange={(e) => setOperatingSystem(e.target.value)}
        />
        <SelectField
          label="CPU"
          id="cpu"
          value={cpu}
          options={cpuOptions}
          onChange={(e) => setCpu(Number(e.target.value))}
        />
        <SelectField
          label="GPU"
          id="gpu"
          value={gpu}
          options={gpuOptions}
          onChange={(e) => setGpu(Number(e.target.value))}
        />
        <SelectField
          label="RAM"
          id="ram"
          value={ram}
          options={ramOptions}
          onChange={(e) => setRam(e.target.value)}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storage">
            Storage (in GB)
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="storage"
            type="number"
            value={storage}
            onChange={(e) => setStorage(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="validityPeriod">
            Validity Period
          </label>
          <div className="flex space-x-2">
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="validityPeriod"
              type="number"
              value={validityPeriod}
              onChange={(e) => setValidityPeriod(Number(e.target.value))}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={validityUnit}
              onChange={(e) => setValidityUnit(e.target.value)}
            >
              <option value="days">Days</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
      </form>
      {progress > 0 && (
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="progress">
            Progress
          </label>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-700 text-sm">{progress}%</p>
        </div>
      )}
      {accessDetails.osUsername && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Access Details</h2>
          <p className="text-gray-700 text-sm">
            OS Username: {accessDetails.osUsername}
          </p>
          <p className="text-gray-700 text-sm">
            Password: {accessDetails.password}
          </p>
          <p className="text-gray-700 text-sm">
            SSH Access: {accessDetails.sshAccess}
          </p>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Request History</h2>
        <ul>
          {requests.map((request, index) => (
            <li key={index} className="mb-2">
              <p className="text-gray-700 text-sm">
                Request Type: {request.requestType}
              </p>
              <p className="text-gray-700 text-sm">
                Operating System: {request.operatingSystem}
              </p>
              <p className="text-gray-700 text-sm">
                CPU: {request.cpu} cores
              </p>
              <p className="text-gray-700 text-sm">
                GPU: {request.gpu}
              </p>
              <p className="text-gray-700 text-sm">
                RAM: {request.ram}
              </p>
              <p className="text-gray-700 text-sm">
                Storage: {request.storage} GB
              </p>
              <p className="text-gray-700 text-sm">
                Validity Period: {request.validityPeriod} {request.validityUnit}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CILSServiceGateway;
