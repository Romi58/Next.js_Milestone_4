import PostView from '../../components/PostView'

export default function Post({ params }: { params: { id: string } }) {
  return <PostView id={parseInt(params.id)} />
}

