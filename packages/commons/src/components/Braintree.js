import React from 'react';

class Braintree extends React.Component {
  constructor(props) {
    super(props);
    this.elementId = `bt-dropin-${Date.now()}-${Math.floor((Math.random() * 100000))}`;
    this.instance = null;
    this.state = {
      isBraintreeError: false,
    };
    this.hiddenInput = React.createRef();
  }

  async componentDidMount() {
    const { getBrainTreeClientToken, onError } = this.props;
    try {
      const res = await getBrainTreeClientToken();
      this.setup(res.result.clientToken);
    } catch (e) {
      onError && onError(e);
    }
  }

  focusThenBlur = async () => {
    /*
    This is for fixing a bug on IE
    When complete inputting payment method, our current focus is still on an input on
    braintree iframe. We unmount this component right after that. Then some how we can't
    focus on any other input on the screen. To fix this issue, we create a fake input
    then focus on it right before everything done on this component
    */
    this.hiddenInput.current.focus();
    this.hiddenInput.current.blur();
    await Promise.resolve();
  }


  // This method will be invoked by other components
  getPaymentMethod = async () => {
    const { onPaymentMethodReceived, transactionAmount } = this.props;
    console.log('this.instance', this.instance);
    if (this.instance === null) {
      await this.focusThenBlur();
      onPaymentMethodReceived(undefined);
      this.braintreeError(null);
      return;
    }
    this.instance.requestPaymentMethod({
      threeDSecure: {
        amount: transactionAmount,
      },
    }, async (requestPaymentMethodErr, payload) => {
      await this.focusThenBlur();
      const threeDSecureInvalid = (
        false && payload && !payload.liabilityShifted && payload.liabilityShiftPossible
      );
      if (payload === undefined || requestPaymentMethodErr || threeDSecureInvalid) {
        onPaymentMethodReceived(undefined);
        this.braintreeError(requestPaymentMethodErr);
        return;
      }
      onPaymentMethodReceived(payload);
    });
  }

  setup = async (clientToken) => {
    const {
      onReady, paymentOptionPriority, onBraintreeLoaded, transactionAmount,
    } = this.props;
    const imported = await import('braintree-web-drop-in');
    const dropin = imported.default || imported;
    let options = {
      authorization: clientToken,
      container: `#${this.elementId}`,
      paymentOptionPriority,
      paypal: {
        flow: 'vault',
      },
    };
    // Verify card with 3D Secure if transaction amount > 0
    if (transactionAmount > 0) {
      options = {
        ...options,
        // threeDSecure: true,
      };
    }
    const callback = (createErr, instance) => {
      this.instance = instance;
      onBraintreeLoaded && onBraintreeLoaded(createErr);
      onReady();
    };
    dropin.create(options, callback);
  }

  braintreeError = (error) => {
    const { onError } = this.props;
    onError && onError(error);
    this.setState({
      isBraintreeError: true,
    }, () => setTimeout(() => this.setState({ isBraintreeError: false }), 500));
  }

  render() {
    const { isBraintreeError } = this.state;
    return (
      <div className={`${isBraintreeError ? 'braintree__error' : ''}`}>
        <input
          type="text"
          ref={this.hiddenInput}
          style={{
            height: 0,
            opacity: 0,
            padding: 0,
            margin: 0,
            border: 'none',
          }}
        />
        <div id={this.elementId} />
      </div>
    );
  }
}

export default Braintree;
