import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './Interaction.css'

export const Interaction = () => {
  return (
    <div>
      <Input className="input" placeholder="Text for task"/>
      <Button className="btn" type="default"> Add</Button>
    </div>
  );
};
