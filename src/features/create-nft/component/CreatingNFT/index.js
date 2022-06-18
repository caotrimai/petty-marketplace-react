import {Button, Form, Input, Upload, Select} from 'antd'
import {useReducer} from 'react'
import {useDispatch} from 'react-redux'
import axiosClient from '~/api/axiosClient'
import nftAPI from '~/api/nftAPI'
import {toastMessage} from '~/features/common/redux/commonSlice'
import SCCreatingNFT from './SCCreatingNFT'

const {Option} = Select

const FIELD = {
  NAME: 'name',
  DESCRIPTION: 'description',
  HP: 'hp',
  ATTACK: 'attack',
  IMAGE: 'image',
  GENDER: 'gender',
  ELEMENT: 'element',
}
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export default function CreatingNFT () {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      loading: false,
    },
    undefined)
  const {loading} = state  
  

  const onFinish = async (values) => {
    setState({loading: true})
    const pet = {
      name: values[FIELD.NAME],
      gender: values[FIELD.GENDER],
      element: values[FIELD.ELEMENT],
      stats_hp: values[FIELD.HP],
      stats_attack: values[FIELD.ATTACK],
      description: values[FIELD.DESCRIPTION],
      image: values[FIELD.IMAGE][0].thumbUrl,
    }
    
    try {
      await axiosClient.post(nftAPI.create(), pet)
      dispatch(toastMessage('Create pet nft success'))
    } catch (err) {
      console.log(err)
      dispatch(toastMessage(err.message))
    } finally {
      setState({loading: false})
    }
  }

  const onReset = () => {
    form.resetFields()
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  return (
    <SCCreatingNFT className='CreatingNFT'>
      <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
        <Form.Item
          name={FIELD.NAME}
          label='Name'
          rules={[
            {required: true},
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={FIELD.HP}
          label='Hp'
          rules={[
            {required: true},
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={FIELD.ATTACK}
          label='Attack hp'
          rules={[
            {required: true},
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={FIELD.IMAGE}
          label='Image'
          valuePropName='fileList'
          getValueFromEvent={normFile}
          rules={[
            {required: true},
          ]}
        >
          <Upload maxCount={1} name='logo' listType='picture'>
            <Button>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name={FIELD.DESCRIPTION}
          label='Description'
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name={FIELD.GENDER}
          label='Gender'
          rules={[
            {required: true},
          ]}
        >
          <Select placeholder='Gender'>
            <Option value='male'>male</Option>
            <Option value='female'>female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={FIELD.ELEMENT}
          label='Element'
          rules={[
            {required: true},
          ]}
        >
          <Select placeholder='Element'>
            <Option value='fire'>fire</Option>
            <Option value='water'>water</Option>
            <Option value='plant'>plant</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button loading={loading} type='primary' htmlType='submit'>
            Submit
          </Button>
          <Button htmlType='button' onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </SCCreatingNFT>
  )
}
