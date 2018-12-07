using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Numerics;
using System.Globalization;

namespace IPv6SubnettingTool
{
    public partial class CompressAddress : Form
    {
        v6ST v6st = new v6ST();
        SEaddress seaddress = new SEaddress();
        public CultureInfo culture;
        public delegate void ChangeWinFormStringsDelegate(CultureInfo culture);
        public event ChangeWinFormStringsDelegate ChangeUILanguage = delegate { };

        public CompressAddress(CultureInfo culture)
        {
            InitializeComponent();
            this.culture = culture;
            this.SwitchLanguage(this.culture);
        }

        public void SwitchLanguage(CultureInfo culture)
        {
            this.culture = culture;
            this.Text = StringsDictionary.KeyValue("CompressForm.Text", this.culture);
            this.label1.Text = StringsDictionary.KeyValue("CompressForm_label1.Text", this.culture);
            this.label2.Text = StringsDictionary.KeyValue("CompressForm_label2.Text", this.culture);
            this.label4.Text = StringsDictionary.KeyValue("CompressForm_label4.Text", this.culture);
            this.button1.Text = StringsDictionary.KeyValue("CompressForm_button1.Text", this.culture);
            //
            this.ChangeUILanguage.Invoke(this.culture);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            textBox2.Clear();
            textBox1.Text = textBox1.Text.Trim();
            this.Calculate(textBox1.Text);
        }

        private void Calculate(string sin)
        {
            if (v6st.IsAddressCorrect(textBox1.Text))
            {
                label3.Text = StringsDictionary.KeyValue("Form1_" + v6ST.errmsg, this.culture);
                string Resv6 = v6st.FormalizeAddr(sin);
                
                // :-) full
                string veryformal = v6st.Kolonlar(Resv6, CheckState.Checked);
                
                textBox2.Text = v6st.CompressAddress(veryformal);
                
                string[] formal = veryformal.Split(':');
                textBox3.Clear();
                foreach (string s in formal)
                    textBox3.Text +=
                        UInt16.Parse(s, System.Globalization.NumberStyles.AllowHexSpecifier).ToString("x")
                        + ":";
                textBox3.Text = textBox3.Text.TrimEnd(':');

                seaddress.Resultv6 = seaddress.Start =
                    BigInteger.Parse("0" + Resv6, NumberStyles.AllowHexSpecifier);
                textBox4.Text = v6st.PrintBin(seaddress, 128, CheckState.Checked).Replace(':', ' ');
                textBox5.Text = "0x" + Resv6;
                textBox6.Text = v6st.DnsRev(seaddress.Resultv6, 128, CheckState.Checked)[0];
                textBox7.Text = v6st.AddressType(seaddress.Resultv6);
                textBox8.Text = seaddress.Resultv6.ToString();
                textBox9.Text = veryformal;
            }
            else
            {
                label3.Text = StringsDictionary.KeyValue("Form1_" + v6ST.errmsg, this.culture);
                textBox2.Clear();
                textBox3.Clear();
                textBox4.Clear();
                textBox5.Clear();
                textBox6.Clear();
                textBox7.Clear();
                textBox8.Clear();
                textBox9.Clear();
            }
        }

        private void CompressAddressForm_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Escape)
            {
                IPv6SubnettingTool.Form1.RemoveForm(this.GetHashCode());
                this.Close();
            }
        }

        private void CompressAddressForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            IPv6SubnettingTool.Form1.RemoveForm(this.GetHashCode());
        }
    }
}
