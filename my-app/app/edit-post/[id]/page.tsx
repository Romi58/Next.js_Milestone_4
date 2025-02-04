import PostEdit from '../../components/PostEdit'

export default function EditPost({ params }: { params: { id: string } }) {
  return <PostEdit id={parseInt(params.id)} />
}

