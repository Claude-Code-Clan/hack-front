import {Empty, Flex} from 'antd';

import {observer} from "mobx-react";


const DetailsPage = observer(() => {

  return (
    <Flex align='center' justify='center' flex={1}>
      <Empty/>
    </Flex>
  );
});

export default DetailsPage;
