import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { compose, branch, renderComponent, withProps } from 'recompose'
import PaymentsHeader from './PaymentsHeader'
import PaymentsLoading from './PaymentsLoading'
import PaymentBox from '../../components/Payments/PaymentBox'
import Toast from '../../components/shared/Toast'
import GetPayments from '../../graphql/getPayments.gql'
import ContentWrapper from '../shared/ContentWrapper'

class Payments extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { payments } = this.props

    return (
      <ContentWrapper>
        <PaymentsHeader />
        <main className="mt7 flex-ns flex-wrap-ns items-start-ns relative">
          {payments.map(payment => (
            <PaymentBox key={payment.id} payment={payment} />
          ))}
        </main>
      </ContentWrapper>
    )
  }
}

Payments.propTypes = {
  payments: PropTypes.array.isRequired,
}

const enhance = compose(
  graphql(GetPayments),
  branch(({ data }) => data.profile == null, renderComponent(PaymentsLoading)),
  withProps(({ data }) => ({ payments: data.profile.payments })),
  withRouter,
)
export default enhance(Payments)
