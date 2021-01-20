import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewMessageModal from "../../components/NewMessageModal/NewMessageModal";
import MessageCard from "../../components/MessageCard/MessageCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './MessagesPage.css'
import MessagesAccordion from "../../components/Accordion/MessagesAccordion";
import FilterContent from "../../components/FilterContent/FilterContent";
import Parse from 'parse';
import MessageModel from "../../model/MessageModel";
import messagePlaceHolder from '../../images/messagePlaceholder.jpg';
import userPlaceHolder from '../../images/userPlaceholder.png';


function MessagesPage(props) {
    const { activeUser, onLogout, message_items, addMessageItems } = props;
    const [showModal, setShowModal] = useState(false);
    const [filteredText, setFilteredText] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [messages, setMessages] = useState([]);
    let ImagePlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AABRHElEQVR42u29CbglV1nu/66zVw279u7d55yeks7QCZ2JDKQzkpAEWo1KxAsKMWoA4WoUHIIMCoogf5SL6FVEg0hQ8eINonLRAIJoVEa5CFdBjITJADITk5CEjJ2k/0+FVW0l6d67ztm7VtWq+u3nqYck7POrXd9atd6vaq31fhIfPnz48OHDh89aP+efv9ucf/7updJh4MGDBw8ePHhh8dZ68sEDD3jw4MGDBw9eWLy1Zh32/PN3R6XDrjf7gAcPHjx48OD5563n5PkJ49IRzXkx8ODBgwcPHjyPvPWcPDn//N1p6UjmvBh48ODBgwcPnkfeek6en3BYOtI5LwYePHjw4MGD55FXMKt+MV9dmJ1//u5R6cj/fWmdJ4YHDx48ePDg+ecZt2hwqerJ8xOOS8dozouBBw8ePHjw4PnlFQsIZycApZNPSsd4zosZw4MHDx48ePC88kxp18D0BMB9OSv9gI3uf+e5mIKzER48ePDgwYPnhVcsIIxLCYCZ9uW09OphQrDhwYMHDx68IHnFroF9CcCsTGH4gLkHgg0PHjx48OCFxctKuwbyBMDOmiNISwnAiGDDgwcPHjx4wfEKDS8SgGjaq3/rMoQiAcgINjx48ODBgxccr7xrYDjVNMgtCohKCUBKsOHBgwcPHrwgeZNSApDOWvRXTgDmsSuk8eDBgwcPHrxmeUUCkE3Vc/dHg9IeQcQfHjx48ODBC5c3qbSGr5QAWMQfHjx48ODBC543Xovd7wDxhwcPHjx48HrEm7OiEMGGBw8ePHjwAucRHHjw4MGDBw/xJzjw4MGDBw8e4k+w4cGDBw8ePMSfYMODBw8ePHiIPzx48ODBgwcP8YcHDx48ePDgtVH8K+/+I9jw4MGDBw9eJ3iF9X9lk6AxwYYHDx48ePCCF39bKQEo1ROeEGx48ODBgwcvaPEv6v1MTwDclzP39D8h2PDgwYMHD16w4p+4ar/RVOt/9+XUPf2PS7WFCTY8ePDgwYMXFi91x74EYFamMCwlAGOCDQ8ePHjw4AXHy5yeFwmAnTVHkJYSgBHBhgcPHjx48ILjFRpeJADRtFf/1mUIRQKQEWx48ODBgwcvOF7x9r5IAJJp4j9w2UFcmi8g2PDgwYMHD154vEkpAUhnLforJwBJZZcggg0PHjx48OC1jVckANlUPXd/NCjtEUT84cGDBw8evHB5k0pr+EoJgEX84cGDBw8evOB547XY/Q4Qf3jw4MGDB69HvPUKP8GGBy9Y3kMl/ZUx5h2rqyunEz948OARHHjwus1blXSZpD3GmL3WDvZaa/ckSXz5EUccfgTxgwcP8Sc48OB1i5e7fz1D0vWS9pbEv3zcYIz5afdd4gcPHuJPcODBC5x3gaRrcuE/sPgP7vvv7jvXuL8hfvDgIf4EGx68AHn3zfMXwl9R/MvHXzkG7QEPHuJPsOHBC4C3b55/DvEvjj2OtUp7wIOH+BNsePDaybvfPP8CxL98XO/YlvaABy988a+8+49gw4PXet795vkXLP7l45qlpaXH0B7w4AXLK6z/K5sEjQk2PHit5D1onr9G8d/Hi+Poqk2bVs+kPeDBC078baUEoFRPeEKw4cFrFW+/8/w+xL/E2xPH8eVJkmymPeDBC0L8i3o/0xMA9+XMPf1PCDY8eK3gHXCe37P4l3n3Wx9A+8KD10rxT1y132iq9b/7cuqe/sel2sIEGx685ngHnOdvUPzvtz6gin8A7QsPnnde6o59CcCsTGFYSgDGBBsevMZ4U+f5WyL+lfwDaF948LzzMqfnRQJgZ80RpKUEYESw4cFrhDdznr+F4n9A/wDaFx4877xCw4sEIJr26t+6DKFIADKCDQ+ed16lef4Wi/+D/AMOOmhbTPvCg+eVV7y9LxKAZJr4D1x2EJfmCwg2PHh+eZXm+QMR/xLPfmI8Hl9I+8KD5403KSUA6axFf+UEIKnsEkSw4cGbmzcYDE6oOs+/ILH+mEs2LnD/7CWZyP0DVldXTqe/wINXO69IALKpeu7+aFDaI4j4w4PngXf44YftMMa8suo8/wLEP38lf+kDtuzl/3ypMeZ6T28SDlhfgP4CD97CeJNKa/hKCYBF/OHBq5/38IeftilNk+fmouvpNX0uur99INHNf1+ejCRJfHlu8ONpGqGyfwD9Dx68NfPGa7H7HSD+8ODVz8vnwvM5cY9z9G+XdFzV37d586Yzoij6G4+/b6p/AP0PHrwaeesVfoIND151Xu6dn8+Be1yg97FZxjwVFiR+zOMCwgf5B9D/4MHzxyM48OAtmHfEEYcf8V+v1r2I//7m+dd7vdaxrve0e2Df+gD6Hzx4iD88eEHyzjjj1JXhMH2etfYGT3PqU+f557zeVcfe42nr4PX5Gol8rQT9Dx48xB8evGB4o9HoCVEUfcLjvvyp8/wLvN7j3Lm8+BDkMXT+AfQ/ePAQf3jw2svL9/NHUT7P782U52NVCvDUcL33rQ/waEL0jgPVF6D/wYOH+MOD1yRvNd/Pb+1gj8cSvJc2WYI3t/dN0+Rn/2uKo/ZkZ03+AfRnePAQf3jw6uTd59vv2UTnt9tkovNfixwHezztbpjpH0B/hgdvJtMQHHjw5nsNfo3H1+B/VXWev4n4WTs4/oHrA2reOrhf/wD6Mzx404Xf+f5UNgkaE2x48PZ9Hlr49vsRf/vxpaWlxwQUv8r+AQuK3z7/APozPHgzxd9WSgBK9YQnBBsevPteu19WbIXzIP435HPs+Vx7gPGb6R+w4Pjl0w+vzO2M6c/w4B1Q/It6P9MTAPflzD39Twg2vB7zrJtzvt5T1bw9+Zy6E7PQ47df/4Aa43dD7r3g/APoz/Dg/ZeeJ67abzTV+t99OXVP/+NSbWGCDa9vvAvcXLOXfe9xHP1N7sXfwfbY5x/gadrkE4FNm8CDVycvdce+BGBWpjAsJQDjrgbH4wIuePDgwYPXIl5PxD9zel4kAHbWHEFaSgBGXQ4ONxM8ePDg9ZPXA/EvNLxIAKJpr/6tyxCKBCDr+msWbiZ48ODB6yev4/pWvL0vEoBkmvgPXHYQl+YLOj/Hws0EDx48eL3ldVnfJqUEIJ216K+cACSVXYICX2DBzQQPHjx4veV1Wd+KBCCbqufujwalPYK9EP9vJgDcTPDgwYPXU16X9W1SaQ1fKQGwfRL//N+5meDBgwevt7wu69t4LXa/g76Jv+NxM8GDBw9eP3n4BqxX+DsSHG4mePDgwesnD9OgHou/uJngwYMHr7c8xL/ndorcTPDgwYPXTx7i33MvZW4mePDgwesnD/HveSEFbiZ48ODB6ycP8e+x+IubCR48ePB6y0P8e74VgpsJHjx48PrJ6634V9791/HgcDPBgwcPXj95vRP/kvV/ZZOgcYeDwz5SePDgwethLZeeir+tlACU6glPOhwc9pHCgwcPXg9rufRQ/It6P9MTAPflzD39TzocHPaRwoMHD14Pa7n0TPwTV+03mmr9776cuqf/cam2cBeDwz5SePDgwethLZcexS91x74EYFamMCwlAOOuBod9pPDgwYPXz1ouPYlf5vS8SADsrDmCtJQAjLocHPaRwoMHD14/a7n0IH6FhhcJQDTt1b91GUKRAGRd71zsI4UHDx68ftZy6Xj8irf3RQKQTBP/gcsO4tJ8Qec7F/tI4cGDB6+3tVy6HL9JKQFIZy36KycASWWXoMA7F/tI4cGDB6+3tVy6HL8iAcim6rn7o0Fpj6DpS+diHyk8ePDgBcub1zGwy/GbVFrDV0oAbJ/En32k8ODBgxc0b1674C7Hb7wWu99B38SffaTw4MGDFzRv3loBtMd6hV/sI93LzQkPHjx41HLpQnv0sXOxjxQePHjwwuRRywXxn4vHPlJ48ODBC5NHLRfEfy4e+0jhwYMHL0wetVwQ/7l47COFBw8evAB51HJB/OflsY8UHjx48ALkUcsF8Z+Xxz5SePDgwQuQRy2X9Yt/5d1/7CNlHyk8ePDgtY1HLZf1Cb/z/alsEjRmHyn7SOHBgwevTTxquaxL/G2lBKBUT3jCPlL2kcKDBw9em3jUclmz+Bf1fqYnAO7LmXv6n7CPlH2k8ODBg9cmHrVc1iT+iav2G021/ndfTt3T/7hUW5h9pOwjhQcPHry28KjlUo2XumNfAjArUxiWEoAx+0jZRwoPHjx4LeNRy2U2L3N6XiQAdtYcQVpKAEbsI2UfKTx48OC1kEctl+m8QsOLBCCa9urfugyhSAAy9pGyjxQePHjwWsqjlsuBecXb+yIBSKaJ/8BlB3FpvoB9pOwjhQcPHry28qjlcmDepJQApLMW/ZUTgKSyS1DgnYt9pPDgwYNHLZcOxq9IALKpeu7+aFDaI2j60rnYRwoPHjx4wfKo5XJg3qTSGr5SAmD7JP7sI4UHDx68oHnUcjkwb7wWu99B38SffaTw4MGDFzSPWi7z8tYr/GIf6d4W+BDsXYCdMbzmeAzm8OBRy4USwX3cR4oY9p7HYA4PHrVcEP8+7iNFDHvPYzCHB49aLoh/H/eRIoa95zGYw4NHLRfEv4/7SBHD3vMYzOHBo5YL4t/HfaSIYe95DObw4DW3hgrx73nnanQOFzHsPY/BHB685tZQ9Vb8K+/+Yx9prXO4iGG/eQzm8OA1t4aqj/ErrP8rmwSN2Uda2xwuYthvHoM5PHgNraHqqfjbSglAqZ7whH2ktc3hIob95jGYw4PX0BqqHop/Ue9negLgvpy5p/8J+0hrm8NFDPvNYzCHB6+hNVQ9E//EVfuNplr/uy+n7ul/XKotzD7Sxc/hIob95jGYw4PX0BqqHsUvdce+BGBWpjAsJQBj9pHWNoeLGPaYx2AOD15za6h6Er/M6XmRANhZcwRpKQEYsY+01jlcxLDHPAZzePCaW0PVg/gVGl4kANG0V//WZQhFApCxj7T2OVzEsMc8BnN48JpbQ9Xx+BVv74sEIJkm/gOXHcSl+QL2kdY/h4sY9pjHYA4PXqNrqLocv0kpAUhnLforJwBJZZegwDsXc7jw4MGDRy2XDsavSACyqXru/mhQ2iNo+tK5mMOFBw8evGB5jdZyaXn8JpXW8JUSANsn8WcfKTx48OAFzWu0lkvL4zdei93voG/izz5SePDgwQua13Qtl/DbY73CL/aR7uXmhAcPHrze1nLpVHv0sXOxjxQePHjwwuQ1XcsF8WcfKTcnPHjw4DXAa7qWC+LPPlJuTnjw4MFrgNd0LRfEn32k3Jzw4MGD55vXglouiD/7SLk54cGDB883rwW1XBD/wHnsI4UHDx68AHktqOUSrPhX3v3HPlL2kcKDBw9e23gtqOUSYvwK6//KJkFj9pGyjxQePHjw2sSjlsu6xN9WSgBK9YQnHQ3O0ewjhQcPHrx+1nLZtGn1lJ6Jf1HvZ3oC4L6cuaf/SceCsyrptyTdxT5SePDgwetnLRdr7V1JEr/6iCMOP6IH4p+4ar/RVOt/9+XUPf2PS7WFQw9OLOnZkm5YYL13bk548ODBa4a3d147d3fcaIx5jtOILsYvdce+BGBWpjAsJQDjDnSuCyV9egFz/oveR7p3AVsR987raNhjHoMvPHg9reWyn/Eg14gndCx+mdPzIgGws+YI0lICMAq8c50p6b01is28vw+xbpbH4AsPXk9ruUwZX3LNOKMD8Ss0vEgAommv/q3LEIoEIAu4cx0u6fWS7q1ZbOa9XsS6WR6DLzx4Pa3lMmN8uddpyOGBxq94e18kAMk08R+47CAuzReE2Lk2SPoVSbd7EpumfQgQf3wc4MHrK8/H+JJryUudtoQUv0kpAUhnLforJwBJZZeg9nSGfFHD0yV91afYtMCHAPHHxwEevL7yfI4vXzXGPP2ss85YCSR+RQKQTdVz90eD0h7B0MT/AklXNyE2Lahnjfjj4wAPXl953seXKIqu2bBh/IQA4jeptIavlADYwMT/JEl/3aTYtKCeNeKPjwM8eH3lNTa+RFH0d4PB4GEtjt94LXa/g4DEf5uk35N0d9Ni04J61og/Pg7w4PWV1/T4kmvQa5wmhdke6xX+Bi4mkfQCSbe0RWxaUM8a8aceODx4feW1ZXy5xWlTEnJ7tLkznCDpo20TmxbUs0b8qQcOD15feW0bX652WoX4L5D3fZK+0UaxaUE9a8SfeuDw4PWV18bx5VanWYj/AnjPOZCZT0vEZq7rRawb5zH4woMXLq+t40uuWc9C/OfjPb/rXvKIdbM8Bl948MLlBTBe/Tzivz7eT3povI837SWPWDfLY/CFBy9cXgjj1XA4fDbivzbeoyXdU2PjfUHSJc49sFEvecS6WR6DLzx44fIWMB682cN4dfeGDePvbZv4V97957kz5IUXbqhJHHLuz0pKH7iIpEEvecQ6bB8HBnN48BriLWIN0NLS0ndba6+td7yyN0SR3dGS+BXW/5VNgsaeOkOekby7BnG41RUIWt7fIhK85OHBgwcvPN6i1gDt2nXS1jRNXmqtvb3Gh5W/dxrXtPjbSglAqZ7wxFNn+LEFi/8eSa+WdPCUn4WXPDx48OAFyFv0GqAtWzafaIx5S41vKi9pWPyLej/TEwD35cw9/U88dIaNkv5zQcHOt2D8qaSjK/w0vOThwYMHL0BejWuAHiPp0zVMU14nadKQ+Ceu2m801frffTl1T//jUm3hOjvDSxYU7KsknbaGn4eXPDx48OCFyatzDVBu6/uLkm5b8BqlFzcQv9Qd+xKAWZnCsJQAjGvuDBsk3Tin+OeN9MS1/j685OHBgwcvWJ6PWi5HFLsFFrRAOV+MPvIYv8zpeZEA2FlzBGkpARh56AxPm1P875C0ez2/Dy95ePDgwQuW57OWSz4t8LkF7U66xFP8Cg0vEoBo2qt/6zKEIgHIPHWGf5jztf9PrPf34SUPDx48eMHyfNdyWZX0vgW8OX6vh/gVb++LBCCZJv4Dlx3EpfkCH53h4Fle/zOC/a/5Vs71/j685OHBgwcvWJ73Wi5ZNsx1498WUCtgW83xm5QSgHTWor9yApBUdgmavzM8ac4FFj81z+/DSx4ePHjwguU1UstldXXlnNzhb079uLjm+BUJQDZVz90fDUp7BI3HzvA7c66ufOg8vw8veXjw4MELltdYLZc4jt80p368sub4TSqt4SslANaz+Oef98y5ujKZ5/fhJQ8PHjx4wfIaq+UyGmU/MI9+RJF9b83xG6/F7nfQgPjnn/8I2YufmxMePHjwGuM1VssliqJD59GPKLKfb0V7rFf4F9QZbm3Yi9/HPlJudnjw4MFbPK/JWi6DOfXjdkoEl3YANOTF73MfKTc7PHjw4C2Otzdg/bi37+KvFnjx+95Hys0ODx48eOjH3r6Lv1rgxe99Hyk3Ozx48OChH30X/zZ48Teyj5SbHR48ePDQj96Kf0u8+BvbR8rNDg8ePHjoRy/FvyVe/I3tI+VmhwcPHjz0ownxr7z7r87O0AIv/r0N+xBws8ODBw8e+uErfoX1f2WToHFdnaEFXvx7G/Yh4GaHBw8ePPTDl/jbSglAqZ7wpK7O0AIv/qb3kXKzw4MHDx764UP8i3o/0xMA9+XMPf1P6uoMLfDib3ofKTc7PHjw4KEfdYt/4qr9RlOt/92XU/f0Py7VFq6jMzTtxd/0PlJudnjw4MFDP+qMX+qOfQnArExhWEoAxjV2hrm8+KMo+vvl5Y2PCHgfKTc7PHjw4DWgH3P8vodIemsg+pE5PS8SADtrjiAtJQCjmjvD3nntFI0x90j6X5IOXevva8E+Um52ePDgwWtAP9bx+1JJL5Z0+wLE34d+FBpeJADRtFf/1mUIRQKQeegMexdgp1gct0l6qaRJ1d/Xgn2k3Ozw4MGD14B+rPH3PVbStQt47e9LP4q390UCkEwT/4HLDuLSfIGPzrAo8S8f10m6VFI06/e1YB8pNzs8ePDgNaMfVV/3/+UCFvz51o9JKQFIZy36KycASWWXoPk7w6LFv3x8UtKF035fC/aRcrPDgwcPXvu8+IfF6/6axL9u/SgSgGyqnrs/GpT2CBqPnaEu8S8f75f0iJbuI+VmhwcPHrx2efHve91fl/h70I9JpTV8pQTAehZ/eRD/fbwoit68ZcvmU1u2j5SbHR48ePDa4cW/s/y6v0498qAf47XY/Q4aEH/5Ev8Sb0+SxK859NDtD2nJPlJudnjw4MFr1os/f93/S5Lu8KlHrWiP9Qr/gjqDT/Ev826S9PwG95He9/F4vfDgwesZrwfJxCK8+B8n6TNNtG/b2qOJkwd9c7agnjWDJTx48Pq6Rmne+P1lyPoRuvgr9JuzBfWsGSzhwYPX1zVKvdaP0MVfHbg554ofgxs8ePA6PceMftSmH6GLfxfmwOeKH4MbPHjw+jLHjH4sVj+CFv+OzIHPFT8GN3jw4PVhjhn9WLx+BC3+HZkDnyt+DG7w4MHr+hwz+lGPfswj/pV3/9XZGTpwc84bPwY3ePDgdXaOGf2oVT/WJfzO96eySdC4rs4wb7CXlpYeY639ZIM357yNx+AGDx68Ts4x181rsD2ukXRBC/RjPeJvKyUApXrCk7o6wyL2uZ5++imbh8P0+dbamxroDPM2HoMbPHjwOjfH7IPXQHvcKOlZpUqzTevHWsW/qPczPQFwX87c0/+krs6wyH2uub2vMeY1ku7xeHM+fs7GY3CDBw9ep+aYffCyLHuix/bINeVySVsW7EPgU/wTV+03mmr9776cuqf/cam2cB2doY59rrskvcvjzflOSSevs/EY3ODBg9elOeZaeaurK+dEUfQej+3xrvL4vmAfAl/xS92xLwGYlSkMSwnAuMbOUOc+1++T9FlPN+d9GWIcx9s817NmsIQHD15b5phr4+3YcdhDkiR+rbWDuz3FL68PcGHNPgQ+4pc5PS8SADtrjiAtJQCjmjtD3ftcU0kvlHSrn5vT3pSm6S/k6xI81bNmsIQHD14b5phr4ZXWeH3dU/y+IekFTjvq9iGoO36FhhcJQDTt1b91GUKRAGQeOoOvfa6HSnq9r5sziuynRqPsIg/1rBks4cGD1/Qccy288Xj8fVFU7PKqPX73SrpC0iEefQjqjF/x9r5IAJJp4j9w2UFcmi/w0Rl873N9hDHmQx5vzr+WdPxaEgAGN3jw4C2IF6T4r66unB7H0d94jN8HJZ3dgA9Bne0xKSUA6axFf+UEIKnsEjR/Z/C+z3X37nM3ZtnwJ6y1X/HUufZIukzSahdX48KDBw/eInhpmq7Gcfw71tq7PIn/lyU9NZ/Ob8KHoOb2KBKAbKqeuz8alPYIGo+dobF9rsccc9ShSRK/3Bhzh6fM/HpJPyXJcrPDgwcP3r7PwBjz49ba//T05iQf818maUOTPgQ1t8ek0hq+UgJgPYv/IubAF/H7dkq60uNruX+T9B0MHvDgwYOnbzHG/IvHaZMr3Zg/9/Uu0semhvYYr8Xud9CA+C9iDnyRv+98SVd7nON7q6SjGTzgwYPXQ96Rkt7kcc3E1W6MX+T11uFj47c91iv8C+oMbdvnOnCv6a/3tMDnrjiOL9u588jDGDzgwYPXA95Y0kvz1/B+xN/eYIy51I3ti77eOn1svLdvEydv6z7XVbdwb4+n1b3XDYfDZ5577lnLDB7w4MHrIC9/0HyKpC952i2xJ47jy5Mk2Vzj9dbtY9Np8VcA+1xPkHSVx9dUH5G0m8EDHjx4HeKd7bbaefJhid65srJ8Zod8bDop/gpln+tolP1AFNlrPe5LfZObI2PwgAcPXqi8Q5wB270+xD8fo8fj0cUer9e3j02nxD8UL+X7eKeeevKWNE1fZK29xZOpR75V5VfcnBmDETx48ELhDZ0F+zc8mSTdko/N+Rjt+Xq9+9h0RvwD8VJ+EC+Oo+2S/rCc1da8dfBL+zOrYDCCBw9eC3kX7a8IW03if28cx1cccsj2Yxq63sZ8bIIX/wC8lGfxTpf0fo/2oB+SdA6DETx48FrIO0XSe3zZI0eR/cDy8sbdDcevDT4269V003jnarmXclXeEyV9waM3+J9s27bloQxG8ODBawFvq6TfcyXRfYx/nx8Ohz/Skvi1ycemsvA735/KJkHjuoLdci/ltfBGkn5Z0u2e5rxuT9PkZccff9zBDEbw4MFrgBdL+llJN3l6+LnNGPPLxx13zLYWxa9tPjZVxN9WSgBK9YQndQW75V7K6+HtkPRGf1XB7BeXlpaeyGAEDx48j7zHSvqUx6qIf2atPbKF8Wurj82BxL+o9zM9AXBfztzT/6SuYLfcS3ndvKWlpd3W2o96LAmar0U4g8ENHjx4NfKOdyXOfdmlf1jSI1scv7b72JT1PHHVfqOp1v/uy6l7+h+XagvXEezwvZQPwDvvvLNXhsPhT+cuf57qgee7El4naTuDGzx48BbIW3mgM2rN4v81ST+WP0u1PH5B+Ng4PU/LCcCsTGFYSgDGNQa7U17K++MdeeSOQ40xvynpLg8lh+HBg9cSXgfEf2ptlBril4+RL5e0MYTkKRAfm8zpeZEA2FlzBGkpARjVHOzOeClX4B0r6e0MlvDg9YMXuPjnlfP+1WP83u7GyGDenATgY1NoeJEARNNe/VuXIRQJQIaXci28CyR9nMESHrxu8wIV/6Mkvdlj/K5xY2Jw0yYt97Ep3t4XCUAyTfwHLjuIS/MFeCnXx4skPUvS1xks4cHrJi8k8c+yYf7a/dck3ekpfje6MTAKdc1Ey31sJqUEIJ216K+cACSVXYLmD3bQXsoL4G2RdHlhosHgCw9ed3ghiH9egtwYc4mkr3iK3z1uzNsS+oLJlq8RKRKAbKqeuz8alPYIGo/BDtZLecG8XcaYdzP4woPXHV7bxX/DhvF3GGP+yWP83iXp5K7slmj5GpFJpTV8pQTAehZ/heqlXBdvNMqeEkX2Pxh84cELn9dW8TrooG0nRFH0Jo/x+4ykC7u2VbLla0TGa7H7HTQg/grUS7lW3sMedsK2JEleYoy5lcEXHrygea0aX3Lr8DRNftVae5un+OXlgF8gKe2oT0L4a0TWK/zqp5eyT96hkl7P4AsPXrC81owvWZZdEkX2ix5Nya6QdEiHx2d1bY1IEycPyUu5Kd4jXClgBl948MLiNT6+5CVzoyj6gMf4fVDS2R1/ONNaE4C2rxFp6uSheCk3zcvf0vx3SV9m8IUHLxheY+PL9u0HHRXH8euttfd6ut58bHqqG6vUk4ezTqwRafLkoXgpt4W3QdLLJN3B4AsPXut53seX5eWNwyRJXmStvcXT9d7hxqQNXVyT1XUfm0ZPHoiXcht5OyVdyeALD16reV7Hl6Wlpcdbaz/j8XqvdGOReij+Cn2NSOPBDsBLudW88Xj02CiKrmHwhQevlTxf48FJxpi/93i9V7taAeqx+CvkNSKtCHbLvZSD4J199pmrw2H6s9baGxh84cFrFa/u8WCTpFcZY+72dL3Xu+qAA8T/wAlA29eIrGn3X4+9lIPiJUmyuWrNbgZzePC88OoaD/KSrj8t6QZP17vHGPNKSat9GU877GNTWP9XNgka99RLOVTeCZKu8jRY3s/Xm/aAB6923qMlfcxXshNF0TsHg8FJtMfsBCAAHxvjHH8HVS2CR/vxF+6Ll3LovMdJ+rSnJ6WbjDHP3bXrpE20Bzx4tfCOkfQ2X286osheOxplP0B7VEsAAvCxMaV6P9MTAPflzD39T3rqpdwFXizpeZJu9vGa9JuDxuhi2gMevIXx8jK9L5d0lyfxvyVN0xe5ZJ72qJAABOBjY1yV37iUAEwtD5y6p/9xqbYwXsrh8g6S9Ie5Raen14bvHgwGu2gPePDWzcv//x+T9DVPaxzujeP4ikMO2X4M7VE9AQjExyZ1x74EYFamMCwlAGO8lLvBGwwGZ0aR/UdPC6QOWPeb9oAHb+rnUZI+7GuBY24VnFsG0x5r+wTiY5M5PS8SADtrjiAtJQAjvJS7x8uy7EejyH7J0+romyT9rJuOoD3gwTvw5whJ/8ff7gb7xbxIEO2xPl4APjaFhhcJQDTt1b91GUKRAGR4KXeXd+yxRx1kjHmJpNs9bY3KFyR+D+0BD96DPiNJB7wXaxD/25Ik/tW8PDDtsX5ey31sirf3RQKQTBP/gcsO4tJ8AV7K/eDtkPRGj/us/07Sw2gPePDuK5zzZElf9Ohr8MatWzefQHt03sdmUkoA0lmL/soJQFLZJWj+YHem3nYHeI/c37xjTYPRfesD4jjeRnvA6ynv4ZI+4NHU6MNLS0u7aY/e+NgUCUA2Vc/dHw1KewSNx2AHX2+7Y7z9rjyucQ7y5jRNX3jqqSdvoT3g9YS3XdL/znfkeBL//F7+sZ07j7S0R698bCaV1vCVEgDrWfwVcr3tjvPut/fYh+lIlmU/SHvA6zAvlfQCSd/wZGd8l7uHN9IevfSxGa/F7nfQgPgrUC/lPvGONcb8lUdv9futD6A94HWEd6Gkz3isZfD2/N6lPWrnhe9js17hVz+9lHvJG4/HF0aR/aSnwiqV/QNoX3gt550s6V0eF9heI+kC2sMbr1M+Nk2cPCQv5V7zTj/9lM1pmvy8MebrnqqqTfUPoH3htZiXJ6+vccmsD/G/UdKzJEW0h1deZ3xsmjp5KF7K8O4/uF3ucXB7kH8A7QGvjbwtWzYlkp4j6eueSg7v920Z7eGN1wkfmyZPHoqXMrwH83ZVeb25wAWE960PoD3gtZG3tLT0WEmf8GSqtdfdeyfTHo3ygvexafTkgXgpw5vO+z5Jn/VnXwqvL7wQ7o/V1ZXTjTF/7TF+n3GLChmvmucF7WPTeLAD8FKGV42Xb3F6oaRbES94i+K1+f448sgdO+I4/l1jzB5P8fuG20aYMl61hhesj00rgt1yL2V4a+cdKun1iBe8RfDaeH+cffaZq8Ph8DnW2us9xS83DLpC0iGML63jBeljo7Xs/uuxlzK8dfImkw3fHkXRPyOG8LpU62PDhg3/LYqif/MYvw9KOpvxpbW8EH1sCuv/yiZB4556KcObg7d797nLWTb8CWvtVxBDeCHX+ti6dcvJcRz9pcf4fVnSU12xIMaX9vJC87ExzvF3UNUieLQff+G+eCnDWwAvy4a5rfDLJN2BGMILqdbHUUc9ZHuSJL9prb3D0/Xe4e6VDYwvQfBC8rExpXo/0xMA9+XMPf1PeuqlDG+xvJ2SrkQM4bV9jvTkk08cDIfpj+dvrzxe75XuHmF8CYcXio+NcVV+41ICMLU8cOqe/sel2sJ4KcNbBO98SVcjhvDaOEe6tLR0bhTZf/Z4vVe7e4LxJTxeKD42qTv2JQCzMoVhKQEY46UMb8G8vAP+lKTrEUN4LZkjPcwY8waP13u9uwcGjAdh8gLxscmcnhcJgJ01R5CWEoARXsrwauStSrpM0h7EEF5Dc6RDSS8yxtzq6Xr3uD6/yngQNi8AH5tCw4sEIJr26t+6DKFIADK8lOH54A0Gg5OiKHonYgjP8xzpD0j6nMfr/VtJJzAedIPXch+b4u19kQAk08R/4LKDuDRfgJcyPK+88Xh0cRTZaxFDeDXPkZ4q6b3+rtdeu7S09D2MB93itdzHZlJKANJZi/7KCUBS2SVo/mB3Yp8wvMXxdu06aZMx5uck3YwY9p636P63TdIfFJUsPVzvLUmS/OLq6krKeNA9Xst9bIoEIJuq5+6PBqU9gsZjsIPeJwyvVt5Bkv7QWaEihv3kLar/xZKeW04qa77ee+M4vmL79oOOYjzoLq/lPjaTSmv4SgmA9Sz+CnWfMDyvvNMlvR8x7CVvEf3vcZI+5et6oyj6wPLyxt3cv93ntdzHZrwWu99BA+KvQL2U4TXDe6KkLyCuveLN01/yxXZX+breKLJfzLLsEu7fXvHC97FZr/Crn17K8JrljST9sqTbPYnX3XEcvzZJ4q20RzC8fHvdKyXd7Uf87W1pmvzq8ccfdzDt0Ttep3xsmjh5SF7K8NrD22GM+T8en1xvlPQsSRHt0VpebnBy6QPNpeoU/yiK/mLbtq0n0h695XXGx6apk4fipQyvhbzJZMN3RVH0UY+vrT8u6QLao3W875D0bx6nOT68YcP40bRH73md8LFp8uSheCnDaynvvPPOXknT9BnGmK95nLN+u6RjaY/GeUdLeovHNQlfM8Y87dxzz1qmPeB1wcem0ZMH4qUMLwxeXnb45ZLu8rRg7S53vo20h3feRNKvS7rTk/jf19bDYbpCe8CrmgC03cem8WAH4KUMLzzese4J3ddq9fzNw9N27jzS0h618/J//lFJX/XYvve97aE94K0lAWi7j00rgt1yL2V4YfMucHP2nra+2X+dTDY8hvaojXeepH/2uBXxmmK9B+0Bby0JQNt9bLSW3X899lKGFz4vcqv3v+5r33scx2/esmXzibTHwng7JP2ZRx+C++34oD3grSUBCMDHprD+r2wSNO6plzK87vC2SLrcGHOPp62DuU/BS5xvAe2xPl5W9nzwIP55fYDLXV+hPeBprQlAAD42xjn+DqpaBI/24y/cFy9leB3jLS9vPCeKovd5dLz7oqQn5+tdaY9qvJNPPnHgXB8/79GB8F2STqY94HXYx8aU6v1MTwDclzP39D/pqZcyvI7yRqPsKdba//Bod/t/JZ1Je0znDQaDh8+q+7Bg8f+MpAtpD3gd97ExrspvXEoAppYHTt3T/7hUWxgvZXid4W3cOMlfMb9Q0q2exCavavhHkrbTHvfnHXzwtqONMX9UtfLjAtrjG5JeICnl/oDXAx+b1B37EoBZmcKwlACM8VKG12HeoZJe73F1+S2Sni8p6Xt77Np10tYkSV5sjLnF05uYPMG4QtIh3B/weuJjkzk9LxIAO2uOIC0lACO8lOH1hPcISR/yaCd7bZYNn9TjaZgnW2s/63Ea5oOSzub+gNcjH5tCw4sEIJr26t+6DKFIADK8lOH1jJffHP9d0pc91o9/7+rqyjl9aY/8WvNr9lhyOG/Lp05biMn9AW89vJb72BRv74sEIJkm/gOXHcSl+QK8lOH1lbdB0ssk3eGh5HD+73cbY/ItaJu72h47dhz2kCSJX5uXWPYk/ne4NtxAf4bXQx+bSSkBSGct+isnAElll6D5gx20lzK8bvOstUdHUfSXnkoOFyY0z6xadniO682L6LzNHUfX2R6nnbZrdThMn2+t/brHqo1XStpJf4ZXJ6/lPjZFApBN1XP3R4PSHkHjMdjBeinD6w9vw4bx46Iousbja+vchvbRNVzv2D0Vl4vo5P/8sizLJouO32iUXRhF9pMefReuzk9Nf4bng9dyH5tJpTV8pQTAehZ/heqlDK9/vLPOOmPFGHOppOs97lPPn9CPWdD1PtEZEx2olsEXsyy7ZDFvTgbHR1H0Nx7fnORt8lOSBvRneL54LfexGa/F7nfQgPgrUC9leP3mrUq6TNIeT1sH71d2eB3Xe4qk91X9fVEU/d/cMXGd8Vs2xrzC2sFdnsR/j2uLVfozvAZ44fvYrFf41U8vZXjwis8Jkq7yVJL2vrLDxpinnXvuWcsVf98mSa92Hvdr/X13S3rVGoQ1f/J+ujHmOk+1Fva62J9Af4bXIK9TPjZNnDwkL2V48Pb3eZykT/spOTzIn9A/Wio7vL/fl4vxT86aqqj4+3LGj0uaFoNvkfQvnnZL5P/90y7m9D94TfM642PT1MlD8VKGB2/aJ5b0PEk3+yg57F7VX2mtPfIBv+ORkj5Sw7TEhyWd+4Bz5ed+k6/rtdbeYoz5ORdr+h+8NvA64WPT5MlD8VKGB6/K5yBjzP+ydnCvp9fgRdnhYyW9wcOahNe7RYkvdfvsfYj/vXEc/e84jrbT/+C1jBe8j02jJw/ESxkevDXxlpc37o6i6B897nvvJC+Kog9s3Dh5FP0PXkt5QfvYNB7sALyU4cFbN284HF5ijPkC4r9We+R9WxLpf/DazAvWx6YVwW65lzI8eIvgjST9sntdj/hP592epsmvHn/8cQfT/+AFwAvSx0Zr2f3XYy9lePAWydsh6Y2I//55cRz/xbZtW0+kv8ALiBeij01h/V/ZJGjcUy9lePDq4D3SrapH/L/pQJhva/wu+gu8AHmh+dgY5/g7qGoRPNqPv3BfvJThwauLl3/nx3Jznx6L/9fSNH3GeeedvUJ/gRcoLyQfG1Oq9zM9AXBfztzT/6SnXsrw4NXNy+19X26MuatH4n+XMeY3jzxyx6H0F3iB80LxsTGuym9cSgCmlgdO3dP/uFRbGC9lePBq4K2urpwWx+XiOZ0V/7dbO3go/QVeR3ih+Nik7tiXAMzKFIalBGCMlzI8ePXxNm1aPTOOo6s8ivXHJF3gjms8JhPvWF1dOZ3+Aq8LvEB8bDKn50UCYGfNEaSlBGCElzI8ePXwduw47PAkiS+31u7xJP43SHpGXrG39FOs+283eHqTsCdJ4lcfeeSOHfQXeCHzAvCxKTS8SACiaa/+rcsQigQgw0sZHrzF8w46aFucpunPWGtv8PSavkrZ3Lx64Cvz73ry9r/eGPNTrngR/QVecLyW+9gUb++LBCCZJv4Dlx3EpfkCvJThwVswb2lp6dHW2ms8ztG/Q9LxVX/fYDA4MYqiv/P4+66W9B30F3ih8VruYzMpJQDprEV/5QQgqewSNH+wg/ZShgdvDZ9jjDFv87hA7xOSHrPe6x2PRxdFkf2UxwWEb3WFhugv8ILgtdzHpkgAsql67v5oUNojaDwGO1gvZXjwKn6WPW/1u1HSsyRF817vaaftWjXGPFvSjZ52D9yVx8rFjP4Hr9W8lvvYTCqt4SslANaz+CtUL2V48Kq8TZf0dEnXedqad7cx5nclba7henPmqyTd7Wnr4HUudgP6H7y28lruYzNei93voAHxV6BeyvDgzfp8m6SP+tqXH0XROweDwcM8XO9Jkv7Wo2/AR5eWls6n/8FrKS98H5v1Cr/66aUMD960z1GS3uzLlCeK7L+PRtn3N3C9j5X0KX+FgqK3bdmy+RT6H7yW8TrlY9PEyUPyUoYH70CfiaT/KelOT+J/U5qmv7Br10mbGoxfLOlnJN3k6U3HnXEcv2I4HC7T/+C1hNcZH5umTh6KlzI8ePv7FEV9vurJROeeJIn/8PDDD93ZovhtNca8xtrBPZ52N+Sx/lEXe/ozvCZ5nfCxafLkoXgpw4P3wM9uSR/x9Ro8iqL3rK6unNPW+K2sLJ+T/0aPdsZ5SeVH0Z/hNcgL3sem0ZMH4qUMD175c6SkN/krxGOvHY1GTwwlflmWXWyM+XePhYfe5NqE/gzPNy9oH5vGgx2AlzI8eMVng6RfkXSHJ/G/OUmSF+7addLWAOOXSHqepJs9VR28w7XNmP4MzyMvWB+bVgS75V7K8ODJzTX/sKQve9r6do8x5g+2bz94Zwfit03S7+fX5GnrYN5GP7xz55GW/gzPAy9IHxutZfdfj72U4cE7T9I/edz3/u7BYHBaB9vjlPzaPE6bfGTjxsmj6c/wauaF6GNTWP9XNgka99RLGV5/eTsk/ZkHx7viuFbSE3rQHhdK+owvn4Q4jv9869bNJ9Cf4dXEC83HxjjH30FVi+DRfvyF++KlDK9/vJGkl0i63ZP43yLp5/M58x61Ryrp+caYWzzVRrjdtemI+wPegnkh+diYUr2f6QmA+3Lmnv4nPfVShtcfXj4f9hRJX/LkdX+vpNdKOqiv7XHwwduOjuP49dbaez1tHfyipB9ybc39Aa9PPjbGVfmNSwnA1PLAqXv6H5dqC+OlDK+LvEdI+qCn1er58V5Jp9Ee32QtL298VBTZ93sqObzXtfUjuD/g9cjHJnXHvgRgVqYwLCUAY7yU4XWQd5ikP/awT704PivpItrjgLzvl/Q5j+3xx64P0B7wuuxjkzk9LxIAO2uOIC0lACO8lOF1iTcej/K94i+WdJsnsfmGpBe4uW/aYzpvKOmFLmY+1mDcKun/k5TRHvDWygvAx6bQ8CIBiKa9+rcuQygSgAwvZXhd4e3efe7GpSXzZEmf9+RQl8/zv07SdtpjzbxDJP2Ri6GPrYOfHw6Hl+zefe4y7QGvKq/lPjbF2/siAUimif/AZQdxab4AL2V4neBNJhu+1RjzAY/2tP8g6QzaY27emZLe76nQUl5v4YPLyxu/lfaAV4XXch+bSSkBSGct+isnAElll6D5gx20lzK8dvO2bz/ooXEc/Ykx5l5P4v8fkn6Q9lg47+L8zY2HksP5v99rjLnCvYWgPeAdkNdyH5siAcim6rn7o0Fpj6DxGOxgvZThtZd34okPPShNk5daa2/ztLo8n0t+UT6XTHvUw8vXbiTJN9vUQ8nhYu3GC926BNoDXmg+NpNKa/hKCYD1LP4K1UsZXnt5o1H2w1FkP++pJG3+ZiF/WjyU9vDDO/jgg46P4/jP3JO6j+Qu35nwA7QHvMB8bMZrsfsdNCD+CtRLGV4LecvLG3dHUfQBj/Xo8zUFZ9EezfAGg6V8L/8/elrTkR/vk3Q67QGvUz426xV+9dNLGV47HeX+2KOj3BckPQlHuVbw8jZ4snP58+Xg+IeSDqY94HXNx6aJk4fkpQyvRbyNGydZkiQvttZ+w9OccO4b8EtVPeVpX6+8kWub2zxVbbzFGPMLJ5740C20R695nfGxaerkoXgpw2sRb2lp6SJr7ec8FJIpvvMGSYfTHq3n5W30J35KDg/2RpH93GiU/RDt0VteJ3xsmjx5KF7K8NrBO8UY8x5PVeTy//9D03zjaY/W8s5xbbfXx9bBKLLvGwwGp9EeveMF72PT6MkD8VKG1zxvm6Q/MMbc40n8v+iqAxraI1ieWVoyT7XWftlTsniPpN93fZX26AcvaB+bxoMdgJcyvGZ5iaTnSbrZjwmMvd0Y8z/WWjue9m0v79hjjz4kSZJfz9vW0+6Qm12fTWiPzvOC9bFpRbBb7qUMr1ne4yX9u7/XuNFfWGsfQnt0k7dly+YTjTFv9GgHnffd76U9Os0L0sdGa9n912MvZXjN8E6W9Pc+vN+d8H9kw4bxd9IeveE9UtI/eyo5vNf15YfRHp3khehjU1j/VzYJGvfUSxmeX94WSZe7uVQf4v+VLBv+5LnnnrVMe/SOl//7D0v6ioeSw8X6gMvjON5Ge3SKF5qPjXGOv4OqFsGj/fgL98VLGZ4fXizpZyR93VPVtzuSJHn5McccdSjt0XveBkkvk3SHn62D9qY0TX/h9NNP2Ux7dIIXko+NKdX7mZ4AuC9n7ul/0lMvZXj18x4n6VO+9m3HcfyWrVu3nEx7wHvAJ1/78SZ/007206NR9v20R/C8UHxsjKvyG5cSgKnlgVP39D8u1RbGSxneongnSrrKg2Nb8eT10clkw2NoD3gzPruNMR/x6DNxlbsXaI8weaH42KTu2JcAzMoUhqUEYIyXMrwF8TZLepWkuz2J/1eHw/TS8847e4X2gFeFl68JGQ6Hz7DWfs1TbYm73T2xmfYIixeIj03m9LxIAOysOYK0lACM8FKGtwBeJOlZkm705NV+pzHmf+7ceeQhtAe89fCOPvohh8Zx/FvGmDs9bR3M741nunuF9giAF4CPTaHhRQIQTXv1b12GUCQAGV7K8BbAe4ykj3tabZ0fV1prj6E94C2Id1TepzyVHN7r7pXH0B7t57Xcx6Z4e18kAMk08R+47CAuzRfgpQxvHt5DJb3Dwz7r4viopG+lPeDVxPs218d89ef83nko7dFeXst9bCalBCCdteivnAAklV2C5g920F7K8PbLW5V0maQ9ngbLr0l6mqQB7QGvZl6+eOrpkq7ztIZlTxzHrz7iiMOPoD3ax2u5j02RAGRT9dz90aC0R9B4DHawXsrwHsTLF5c8Q9L1nhzW7pL0G5I20h7wPPM2ur53l6etgzcMh+lzzzjj1BXaoz28lvvYTCqt4SslANaz+CtUL2V4D+I9WtLHPNqrvkXS0bQHvIZ5x0h6q59CVffx/k3Sd9Ie7eC13MdmvBa730ED4q9AvZTh/RfvWElv87hA6mpJ3057wGsTbzwefU8URdd48A0ojre5e4/2aJYXvo/NeoVf/fRShnf+7kmapvk8/yvKr0BrFv//lPQTbg6W9oDXOt7ZZ5+5OhymP2Otvd5DyeFiCuw3JS3THo3xOuVj08TJQ/JS7j3vrLPOWDHG/KQTZB8lVfe4RGOF9oAXRnKcbHJ9do+n5Pg6kuPGeJ3xsWnq5KF4KfeeNx6PHmuM+VeP9dTz15zH0R7wAuXlffftntbE5Ed+b55Pe3jldcLHpsmTh+Kl3Fveli2bT42i6O2eXmvudYsJH017wOsI74JpC2RrWED4lk2bVnfRHvjYtF38Q/FS7iVv584jD0uS5DJr7Z2exD/fPnip205Ie8DrEq/YInuDp5LXd+b3bn4P0x618oL2sWk82AF4KfeOlxfOGQ6Hz7TWXudhNXMxz3+ZMxCiPeB1mbfPJMvP1kH7NWNMbpK1RHvUwgvWx6YVwW65l3LveJPJhu+OouhqT1uZCrvT42kPeH3iDQaDE6Mo+jtPJYfz4yOSvoX2WDgvSB8brWX3X4+9lHvD27x508lxHP2lx33MDyp4QnvA6xtvPB5dFEX2U56S7fz4c0kPoT0WxgvRx6aw/q9sEjTuqZdy53lZNtwYx/FvWmvv8CT+U0ueMhjB6xvvtNN2rRpjnj2tVPaCFxDeIellkjbQHr3zsTHO8XdQ1SJ4tB9/4b54KXeZt2SMucRa+1VPryHvlvQ7kjbRHvDg7Ze3WdKr3L3iY+vgVyT9SLE+gPbovI+NKdX7mZ4AuC9n7ul/0lMv5a7yHmmM+WdP3uX5/3+VpBNpD3jwKvFOkvS3nkoO58c/LS0tPYr26LSPjXFVfuNSAjC1PHDqnv7HpdrCeCmHzTtC0hs9Fi75pKTH0h7w4K2Ll987n/LgG3Df38dxfOW2bVtPoj3WlgAE4mOTumNfAjArUxiWEoAxXspB88aSXirpdk9bj24yxvyMpJj2gAdvLl5+Dz1H0tc9lBzOj9uTJP71LMsmtMfsTyA+NpnT8yIBsLPmCNJSAjDCSzlYXv6K56mSvuRp8Lg7juPXxnG8jfaAB2+hvC3GmNdYO7jH07Tdl9zYYWiPA/MC8LEpNLxIAKJpr/6tyxCKBCDDSzlY3jmS/p8Hx7H7jiiK3rO8vPFs2gMevPp4q6sr5+T3mkefjg+5sYT22A+v5T42xdv7IgFIpon/wGUHcWm+AC/l8HiHS/oTT3aje6PIXjsajZ7IYA4Pnj9elmUXG2P+3WNhrje4sYX2CMfHZlJKANJZi/7KCUBS2SVo/mAH7aXcIt5I0i9Jus2T+N+cpukvnnrqyVsYzOHBa4SXSHqupJs9lBze68aWfIzJaI8gfGyKBCCbqufujwalPYLGY7CD9VJuCS9vqydL+oKn1cL3xHH8ukMPPeRoBnN48FrBy9fc/L6kezxtHczHmiedfPKJg763R8t9bCaV1vCVEgDrWfwVqpdyS3hnSfqApxKj+ev+966sLJ/L4AsPXit5p0h6t8fx4EPLyxu/rc/t0XIfm/Fa7H4HDYi/AvVSbpp3qKTXS7rX081+bZYNn8TgCw9eELwLJX3G0wLge+M4/tNt27Ye19P2CN/HZr3Cr356KTfJG0p6kaRbPTmE3WKMef7DHnbCZgZfePCC4uXrA37eGHOLJ9OvW93YNOxZe3TKx6aJk4fkpdwk72JJ/+Fpji+fS3xtHEfbGXzhwQuXt337QUfFcXxF/qTuaetgPkb9YI/aozM+Nk2dPBQv5aZ4Z0h6v4fCIMXxXkmnMvjCg9cd3vLyxkdFkX2/p5LD+fEPbuzqent0wsemyZOH4qXsm7dd0usONM9fg/h/VtJFDJbw4HWa9/3uXt/rYevgvW4M297h9gjex6bRkwfipeyTl0p6gaRveCoJmp/nF9x5GSzhwes+r/IYs6CHi31jTAfbI2gfm8aDHYCXsk/eRWvJzue8OR+UnTNYwoPXK97Ut4w17B74TJYNn9Kx9gjWx6YVwW65l7Iv3qmS3uPptdx+5+cYLOHB6y3vzAeuM6rXPjx6/8rK8iM7Er8gfWy0lt1/PfZSrpWXr7LPV9vPcvBaoPjvd4UugyU8ePCKnUZ+SoYP7jHGvNa5GIYcvxB9bArr/8omQeOeeinXwsv31Rtjfn4tHt5zin++R/cX97dHl8ESHjx4xWc8Ho2TJHmptfY2DyWH97ox8Oecb0GI8QvNx8Y4x99BVYvg0X78hfvipVxDFa/hk3JnPU9bcfK5vSuccyCDJTx48CrxDj74oONzhz9rB/d62jqYVzZ8QoDxC8nHxpTq/UxPANyXM/f0P+mpl/LCeLmHfu6l73Ef7gdcrQAGN3jw4K2LNxgsPULSP3p6U5kf75R0ckDxC8XHxrgqv3EpAZhaHjh1T//jUm1hvJTXyDvssENyJ67XuTkvH+J/X6UuVyWQwQ0ePHjz8g5YcbSm3QP5mqjXSNoaQPxC8bFJ3bEvAZiVKQxLCcAYL+W18U499eQtaZq+0Fp7swf7zaJW94vLtboZ3ODBg7dA3kjSL7mxxkctkpuMMc/dteukTW2NXyA+NpnT8yIBsLPmCNJSAjDCS3ltvNFodHEU2X/35L2dH38s6TAGN3jw4HngHS7pDT5KDud/n4+l4/Ho4jbGLwAfm0LDiwQgmvbq37oMoUgAMryUq/NWVpbPiqLo3Z5Wz+bHhyQ9gsENHjx4DfDOcWPQXh9bB6MoetdgMHhYm+LXch+b4u19kQAk08R/4LKDuDRfgJdyhU+SxFvjOP4Da+3dnsT/i5KeMm2en8ENHjx4Hnhmack81Vr7ZQ8lh/P//25Jvytpcxvi13Ifm0kpAUhnLforJwBJZZeg+YMdspdyZIx5jrX2Jk+d/3ZJL3FzcQxG8ODBawXv2GOPPiRJkl+31t7uadrzRknPzsfgJuPXch+bIgHIpuq5+6NBaY+g8di5QvVS/m5jzCc8OGYVvD+VtIPBCB48eG3lbdmy+URjzBs9bXXOj0/kY3FT19tyH5tJpTV8pQTAehZ/BeilfIKkv/Zkl5n/93+SdB6DETx48ALi5WPWP3mqbZIffy3peN/X23Ifm/Fa7H4HDYi/AvJS3iTplfkclB/xt18xxvyIpCUGI3jw4AXIy//9hyV9xUPJ4fzYk4/RSZJs9ni94fvYrFf41Q8v5XzP5E9LusHTatc7kiT+jSwbbmQwggcPXgd4GyT9iqQ7/GwdtDcOh+nzHv7w0zZ5uN5O+dg0cfI2eylfIOkaHyUy8yOO4zdv2bLpJAYPePDgdZD3EElv8jWeRlH08dFo9Hh8bNor/mqpl/Jxkt7usT72RyeTDY9h8IAHD14PeLuNMR/2uID67W5Mr+N6O+Fj0+TJ2+SlvCLpt9xckg/x/1qWDS8977yzVxg84MGD1xfeueeetTwcDp+Rj4GeTNP2uLF9ZcHXG7yPTaMnb4mXcl4Y4Scl/aenOao7kyT5raOPfsihDB7w4MHrKy8fA+M4foUx5k5PWwf/0431gwVdb8g+Ns13hhZ4KX+HpKs9FLa47++iKHrr1q2bdzF4wIMHD94+3lGSrvRUcnivG/O/fQHXG6qPTTs6Q4NeysdIequnqlb53/3LeDz6bm52ePDgwTsg71slfdSDb0Bx5BpwdI98bMpM03hnaMBLeVnSyyXd5Un8v2aMefpZZ52xws0ODx48eDN5+ev5p0m6ztPD2V1xHF+2c+eRh3XYx+Z+wu98fyqbBI074KWcd6qnH6hT1dC58gTjN4bDdIWbHR48ePDWzMu9UH6j/LBW89bB64bD4TPdw1pXfGz2J/62UgJQqic8CdxL2fdrpbfM+VqJwQMePHjwvvk5Oh9TPdqv/4vTjDUlAC30sdmf+Bf1fqYnAO7LmXv6nwTqpVx5YcmCOte/FgtLuNnhwYMHb3G88Xj0uCiKrvFUcj0//kLSzioJQMt8bA6k54mr9htNtf53X07d0/+4VFs4FC/liaRfk3SnJ/HPt5b8RLG1hJsdHjx48BbPO/vsM1eHw2Fegv16DyWH9zoN+TWnKftNAFrkYzMtfqk79iUAszKFYSkBGAfipZwfPyrpq562kuRzU68om0tws8ODBw9evbw0TTa5sXePp62DeUGjSx5YnK0lPjaz4pc5PS8SADtrjiAtJQCjQLyUHyXpwx73kb5N0rHcnPDgwYPXGO84Nxb7mub9sNOatvjYzIpfoeFFAhBNe/VvXYZQJACZh84wl1hba3eWC0x4EP+PSfpObk548ODBaw3v0W5s9uXr8qa8cFuDPjZV4le8vS8SgGSa+A9cdhCX5gt8NN68Yn2HJ/G/XtKlrjwwNyc8ePDgtYtn3Rh9g6daLnc04GOzlvhNSglAOmvRXzkBSCq7BM3feL625q2Xl88x/bakVW5OePDgwWs9Lx+rL8vH7hbox6J8bNYTvyIByKbqufujQWmPoPHYeG0W/3dIOp6bEx48ePDC4g0GgxOjKPrbtor/Gnxs1hu/SaU1fKUEwHoWf7VU/D8u6bu4meDBgwcvbN54PLooiuwn2yb+FXxs5o3feC12v4MGxF8tE/8bJT1TUsTNBA8ePHjd4J122q5VY8yz3BjfCvGf4mPjN37rFf4FNV4bxP9uSb8jaRM3Ezx48OB1lrdZ0qvcmL+36TVobYtfEydvWvz/RtIJ3Ezw4MGD1xveiZKuanoNWt/FXw2K/ycl/TduJnjw4MHrLe+xTgsaeRPdd/FXA+L/dUnPnjXPz80EDx48eL3gxZKe47TBtx71WvzlMdj5nM+rJW2h88ODBw8evAd8thhjXmPt4B6Pb6L7K/4L8lKuEuy/l/QwOj88ePDgwZvGW11dOSeKovd4WoPWX/HP/75e8bfXLi0tfS+dHx48ePDgrYWXZdnFxphP17z1vDHxr7z7r85g1yT+NydJ8oLV1ZWUzg8PHjx48NbJy9cHPFfSzTX5BjRxvYX1f2WToHFdwV6w+N8Tx/Hrtm8/eCedHx48ePDgLYi3TdLvS7pnwVsHmxB/WykBKNUTntQV7EWJfxRF71tZWT6XzgoPHjx48GrinSLp3Qv0DfAt/kW9n+kJgPty5p7+J3UFe17xjyL72dEoezKdFR48ePDgeeI9QdK1C/AN8Cn+iav2G021/ndfTt3T/7hUW7iOYM/15L9r10lb6azw4MGDB88zL1mAb4Cv603dsS8BmJUpDEsJwLjGYHfKSxkePHjw4PWDtwAfGx/Xmzk9LxIAO2uOIC0lAKOag90ZL2V48ODBg9cf3gJ8bOq+3kLDiwQgmvbq37oMoUgAMg/B7oSXMjx48ODB6xdvAT42df6+4u19kQAk08R/4LKDuDRf4CPYwXspw4MHDx68/vEW4GNT5++blBKAdNaiv3ICkFR2CZo/2EF7KcODBw8evH7y5vWxqfn3FQlANlXP3R8NSnsEjcdgB+ulDA8ePHjw+sub18em5t83qbSGr5QAWM/ir1C9lOHBgwcPXr958/rY1Pz7xmux+x00IP4K1EsZHjx48ODBm8vHphXXu17hX1Cw75nTTtHSWeHBgwcPnmdeNKePzd1tu94mTv6NOe0UD6WzwoMHDx48z7wd81at7bv455/Pzmmn+Hg6Kzx48ODB88y7aD4fG/vZvot//nnvnHaKb6SzwoMHDx48z7w/n9PH5t19F//cS/n35rRTvMeVaKSzwoMHDx48H7wzJN07p4/Nq3st/vnfpWn6zAXYKX5C0hY6Kzx48ODBq5m3VdKnF2Bid0mvxT//+02bVh++ADvF/O8+uXHj5JF0Vnjw4MGDV+OT/yLEPz+OaVL8K+/+qzvYUWQ/N6+jkgv2PXEcv2U0yn5o69bNJ2zZsimh88ODBw8evHXyIrfa/yI353/vgsT/0w1eb2H9X9kkaFxnsOM4fsUCxH/vgt4kwIMHDx48eHXyfqVB8beVEoBSPeFJnZmWtYPjq2RWdC548ODBgxc4794qr/9rEv+i3s/0BMB9OXNP/xMPr23+is4FDx48ePA6zntrQ+KfuGq/0VTrf/fl1D39j0u1heucszmLzgUPHjx48DrMy5/+T29gjUPqjn0JwKxMYVhKAMaeFmz8KZ0LHjx48OB1lHdFA+KfOT0vEgA7a44gLSUAI4+rNQ+WdAOdCx48ePDgdYx3vaRtnsW/0PAiAYimvfq3LkMoEoCsga0a30fnggcPHjx4HeM93rP4F2/viwQgmSb+A5cdxKX5gqb2af46nQsePHjw4HWE97IGfA0mpQQgnbXor5wAJJVdguq5mKViPQCdCx48ePDgBcz747zsTQOmRkUCkE3Vc/dHg9IewSbFv/hExpg/o3PBgwcPHryAxd825Gg4qbSGr5QA2JaI/328c889azlJksvoXPDgwYMHL8DX/qYh8d9YefdeKQFojfiXeaNR9hRr7Y10Lnjw4MGDF8Bq/8c3pZdr5q1X+H1eTBRFh0h6A50LHjx48OC11OTniga2+nWrRPAM3sMlvW2BVZno/PDgwYMHbx5v/7c25PDXK/Evf451cyzX0lnhwYMHD55n3qddVb9jAtDLTon//pKBH5X0aknvMsZca629xVp7N50VHjx48OCtk5dryM3W2s8aY97tNOaSKqKP+MODBw8ePHjwEH948ODBgwcPHuIPDx48ePDgwWtA/Cvv/iPY8ODBgwcPXid4hfV/ZZOgMcGGBw8ePHjwghd/WykBKNUTnhBsePDgwYMHL2jxL+r9TE8A3Jcz9/Q/Idjw4MGDBw9esOKfuGq/0VTrf/fl1D39j0u1hQk2PHjw4MGDFxYvdce+BGBWpjAsJQBjgg0PHjx48OAFx8ucnhcJgJ01R5CWEoARwYYHDx48ePCC4xUaXiQA0bRX/9ZlCEUCkBFsePDgwYMHLzhe8fa+SACSaeI/cNlBXJovINjw4MGDBw9eeLxJKQFIZy36KycASWWXIIINDx48ePDgtY1XJADZVD13fzQo7RFE/OHBgwcPHrxweZNKa/hKCYBF/OHBgwcPHrzgeeO12P0OEH948ODBgwevR7z1Cj/BhgcPHjx48LrBIzjw4MGDBw8e4k9w4MGDBw8ePMSfYMODBw8ePHiIP8GGBw8ePHjwEH948ODBgwcPHuIPDx48ePDgwWuj+Ffe/Uew4cGDBw8evE7wCuv/yiZBY4INDx48ePDgBS/+tlICUKonPCHY8ODBgwcPXtDiX9T7mZ4AuC9n7ul/QrDhwYMHDx68YMU/cdV+o6nW/+7LqXv6H5dqCxNsePDgwYMHLyxe6o59CcCsTGFYSgDGBBsePHjw4MELjpc5PS8SADtrjiAtJQAjgg0PHjx48OAFxys0vEgAommv/q3LEIoEICPY8ODBgwcPXnC84u19kQAk08R/4LKDuDRfQLDhwYMHDx688HiTUgKQzlr0V04AksouQQQbHjx48ODBaxuvSACyqXru/mhQ2iOI+MODBw8ePHjh8iaV1vCVEgCL+MODBw8ePHjB88ZrsfsdIP7w4MGDBw9ej3jrFX6CDQ8ePHjw4HWDR3DgwYMHDx48xJ/gwIMHDx48eIj//U9erhEwWYBdMDx48ODBgwfPI289Jy/XCBgvwC4YHjx48ODBg+eRt56TZyV/4dEC7ILhwYMHDx48eB55az25KdUIGJaKCxh48ODBgwcPXhg8rWX3X6lEcFo6kjkvBh48ePDgwYPnnzeoahJkSjUCiiOa8+Tw4MGDBw8ePP88WykBKH05Kh12ASeHBw8ePHjw4DXDq5QADB54aI4PPHjw4MGDB68VPDMrW1gqHWbOk8ODBw8ePHjwWsL7/wEobXbhLDN1pwAAAABJRU5ErkJggg==";
    let filteredMessages = messages.filter(message =>
        message.title.toLowerCase().includes(filteredText.toLowerCase()) ||
        message.details.toLowerCase().includes(filteredText.toLowerCase()));


    useEffect(() => {
        async function fetchData() {
            const ParseMessage = Parse.Object.extend('Message');
            const query = new Parse.Query(ParseMessage);
            query.equalTo("userId", Parse.User.current());
            const parseMessages = await query.find();
            setMessages(parseMessages.map(parseMessage => new MessageModel(parseMessage)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])

    async function addMessage(title, details, priority, img) {
        const ParseMessage = Parse.Object.extend('Message');
        const newMessage = new ParseMessage();

        newMessage.set('title', title);
        newMessage.set('details', details);
        if (img) {
            newMessage.set('img', new Parse.File(img.name, img));
        }
        else {
            newMessage.set('img', new Parse.File("placeHolderImage", { base64: userPlaceHolder }));
        }
        newMessage.set('priority', priority);
        newMessage.set('date', new Date().toString());
        newMessage.set('isRead', []);
        newMessage.set('building', Parse.User.current().attributes.building);
        var relation = newMessage.relation("userId");
        relation.add(Parse.User.current());
        const parseMessage = await newMessage.save();
        setMessages(messages.concat(new MessageModel(parseMessage)));
    }

    function updateMessage(messageId, activeUserId) {
        const Message = Parse.Object.extend('Message');
        const query = new Parse.Query(Message);

        query.get(messageId).then((object) => {
            let arr = object.get('isRead');
            if (!arr.includes(activeUserId)) {
                arr.push(activeUserId);
            }
            object.set('isRead', arr);
            object.save().then((response) => {
                const found = messages.find(element => element.id === messageId);
                const index = messages.indexOf(found);
                messages[index].isRead.push(activeUserId);
                setMessages([...messages]);
                console.log('Updated Message Read status', response);
            }, (error) => {
                console.error('Error while updating Message', error);
            });
        });
    }

    function removeMessage(messageId) {
        const Message = Parse.Object.extend('Message');
        const query = new Parse.Query(Message);
        query.get(messageId).then((object) => {
            object.destroy().then((response) => {
                const found = messages.find(element => element.id === messageId);
                const index = messages.indexOf(found);
                messages.splice(index, 1);
                setMessages([...messages]);
                console.log('Deleted Message', response);
            }, (error) => {
                console.error('Error while deleting Message', error);
            });
        });
    }

    function updateMessageContent(title, details, priority, img, messageId) {

        const Message = Parse.Object.extend('Message');
        const query = new Parse.Query(Message);

        query.get(messageId).then((object) => {
            object.set('title', title);
            object.set('details', details);
            object.set('priority', priority);
            if (img) {
                object.set('img', new Parse.File(img.name, img));
            } else {
                object.set('img', new Parse.File("placeHolderImage", { base64: userPlaceHolder }));
            }


            object.save().then((response) => {
                const found = messages.find(element => element.id === messageId);
                const index = messages.indexOf(found);
                messages[index].title = title;
                messages[index].details = details;
                messages[index].priority = priority;
                messages[index].img = img;
                setMessages([...messages]);
                console.log('Updated Message ', response);
            }, (error) => {
                console.error('Error while updating Message', error);
            });
        });
    }

    function SortMessages(sortBy) {
        if (sortBy === "date") {
            messages.sort(function (a, b) {
                const firstDate = Date.parse(a.date);
                const secondDate = Date.parse(b.date);

                return secondDate - firstDate;
            });
        }
        else {
            messages.sort(function (a, b) {
                var nameA = a.priority.toUpperCase(); // ignore upper and lowercase
                var nameB = b.priority.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
        }
        setMessages([...messages]);
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }

    function FilterPriority(eventKey, event) {
        if (event.target.innerHTML === "No Filter") {
            setPriorityFilter("");
        }
        else {
            setPriorityFilter(event.target.innerHTML);
        }

    }

    filteredMessages = filteredMessages.filter(message =>
        message.priority.toLowerCase().includes(priorityFilter.toLowerCase()));



    const messagesView = filteredMessages.map(message => <MessageCard message={message} message_items={message_items}
        addMessageItems={addMessageItems}
        removeMessage={removeMessage} activeUser={activeUser} updateMessageContent={updateMessageContent} />)

    return (
        <div className="p-messages">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <h1>Messages Page for bulding: {activeUser.building}</h1>
            <FilterContent isMessagesPage={true} filteredText={filteredText} onFilterChange={e => setFilteredText(e.target.value)}
                priorityFilter={priorityFilter} FilterPriority={FilterPriority} Sort={SortMessages} />
            <div className="b-new-message" style={{ visibility: activeUser.role === "committee" ? "visible" : "hidden" }}>
                <Button variant="link" onClick={() => setShowModal(true)}>New Message</Button>
            </div>
            <MessagesAccordion panels={messagesView} updateMessage={updateMessage} />
            <NewMessageModal isUpdate="false" show={showModal} handleClose={() => setShowModal(false)} addMessage={addMessage} />
        </div>
    )

}

export default MessagesPage;