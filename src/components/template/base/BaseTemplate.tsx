import styles from './BaseTemplate.module.scss'

export type BaseTemplateProps = {
  sampleTextProp: string
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ sampleTextProp }) => (
  <div className={styles['container']}>{sampleTextProp}</div>
)

export default BaseTemplate
