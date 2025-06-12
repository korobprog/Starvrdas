import React, { useState } from 'react';
import './Architecture.css';

interface ApiParameter {
  name: string;
  type: string;
  description: string;
  required?: boolean;
}

interface ApiResponse {
  status: number;
  description: string;
  schema?: string;
}

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  parameters?: ApiParameter[];
  responses?: ApiResponse[];
}

interface ApiGroupProps {
  title: string;
  endpoints: ApiEndpoint[];
}

const ApiGroup: React.FC<ApiGroupProps> = ({ title, endpoints }) => {
  const [expandedEndpoint, setExpandedEndpoint] = useState<number | null>(null);

  const toggleEndpoint = (index: number) => {
    setExpandedEndpoint(expandedEndpoint === index ? null : index);
  };

  return (
    <div className="api-group">
      <h4>{title}</h4>
      <ul className="api-list">
        {endpoints.map((endpoint, index) => (
          <li key={index} className="api-endpoint">
            <div
              className="api-endpoint-header"
              onClick={() => toggleEndpoint(index)}
            >
              <span className={`api-method ${endpoint.method}`}>
                {endpoint.method}
              </span>
              <code>{endpoint.path}</code>
              <span className="api-description">{endpoint.description}</span>
              <span className="api-toggle">
                {expandedEndpoint === index ? '▼' : '▶'}
              </span>
            </div>

            {expandedEndpoint === index && (
              <div className="api-endpoint-details">
                {endpoint.parameters && endpoint.parameters.length > 0 && (
                  <div className="api-parameters">
                    <h5>Параметры:</h5>
                    <table>
                      <thead>
                        <tr>
                          <th>Имя</th>
                          <th>Тип</th>
                          <th>Обязательный</th>
                          <th>Описание</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <tr key={paramIndex}>
                            <td>
                              <code>{param.name}</code>
                            </td>
                            <td>
                              <code>{param.type}</code>
                            </td>
                            <td>{param.required ? 'Да' : 'Нет'}</td>
                            <td>{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {endpoint.responses && endpoint.responses.length > 0 && (
                  <div className="api-responses">
                    <h5>Ответы:</h5>
                    <table>
                      <thead>
                        <tr>
                          <th>Статус</th>
                          <th>Описание</th>
                          {endpoint.responses.some((r) => r.schema) && (
                            <th>Схема</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.responses.map((response, responseIndex) => (
                          <tr key={responseIndex}>
                            <td>
                              <code>{response.status}</code>
                            </td>
                            <td>{response.description}</td>
                            {endpoint.responses!.some((r) => r.schema) && (
                              <td>
                                {response.schema && (
                                  <code>{response.schema}</code>
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiGroup;
